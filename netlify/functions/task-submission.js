const MAX_ATTACHMENT_COUNT = 3;
const MAX_ATTACHMENT_SIZE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
  'image/jpeg',
  'image/png',
  'text/plain'
]);

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(payload)
  };
}

function sanitizeText(value, maxLength) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function sanitizeFileName(value, fallbackName) {
  const normalized = String(value || fallbackName || 'attachment')
    .replace(/[\\/]/g, '_')
    .replace(/[^\w.\-() ]+/g, '_')
    .trim();
  return normalized.slice(0, 120) || fallbackName || 'attachment';
}

function inferMimeFromFilename(fileName) {
  const normalized = String(fileName || '').toLowerCase();
  if (normalized.endsWith('.pdf')) return 'application/pdf';
  if (normalized.endsWith('.doc')) return 'application/msword';
  if (normalized.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (normalized.endsWith('.ppt')) return 'application/vnd.ms-powerpoint';
  if (normalized.endsWith('.pptx')) return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  if (normalized.endsWith('.xls')) return 'application/vnd.ms-excel';
  if (normalized.endsWith('.xlsx')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if (normalized.endsWith('.zip')) return 'application/zip';
  if (normalized.endsWith('.png')) return 'image/png';
  if (normalized.endsWith('.jpg') || normalized.endsWith('.jpeg')) return 'image/jpeg';
  if (normalized.endsWith('.txt')) return 'text/plain';
  return '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function parseRequestBody(event) {
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '{}');

  try {
    return JSON.parse(rawBody);
  } catch (error) {
    throw new AppError('Geçersiz istek gövdesi.', 400);
  }
}

function normalizeAttachments(rawAttachments) {
  if (!Array.isArray(rawAttachments) || rawAttachments.length === 0) {
    return [];
  }

  if (rawAttachments.length > MAX_ATTACHMENT_COUNT) {
    throw new AppError(`En fazla ${MAX_ATTACHMENT_COUNT} dosya yükleyebilirsiniz.`, 400);
  }

  let totalSize = 0;
  return rawAttachments.map((attachment, index) => {
    const fileName = sanitizeFileName(attachment.name, `attachment-${index + 1}`);
    const rawMimeType = sanitizeText(attachment.type, 80).toLowerCase();
    const mimeType = ALLOWED_MIME_TYPES.has(rawMimeType)
      ? rawMimeType
      : inferMimeFromFilename(fileName);
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      throw new AppError(`Desteklenmeyen dosya türü: ${mimeType || 'bilinmiyor'}`, 400);
    }
    const base64Content = String(attachment.content || '')
      .split(',')
      .pop()
      .replace(/\s/g, '');

    if (!base64Content) {
      throw new AppError(`"${fileName}" dosyası boş görünüyor.`, 400);
    }

    const buffer = Buffer.from(base64Content, 'base64');
    const byteLength = buffer.length;

    if (!byteLength) {
      throw new AppError(`"${fileName}" dosyası çözümlenemedi.`, 400);
    }

    if (byteLength > MAX_ATTACHMENT_SIZE_BYTES) {
      throw new AppError(`"${fileName}" dosyası 2 MB sınırını aşıyor.`, 400);
    }

    totalSize += byteLength;
    if (totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
      throw new AppError('Toplam dosya boyutu 5 MB sınırını aşıyor.', 400);
    }

    return {
      filename: fileName,
      content: buffer.toString('base64'),
      type: mimeType
    };
  });
}

async function verifyTurnstile(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new AppError('Captcha yapılandırması eksik.', 500);
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token || '');
  if (remoteIp) {
    params.append('remoteip', remoteIp);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  if (!response.ok) {
    throw new AppError('Captcha servisine ulaşılamadı.', 502);
  }

  const result = await response.json();
  return Boolean(result.success);
}

async function sendEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SUBMISSION_FROM_EMAIL;
  const toEmail = process.env.SUBMISSION_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    throw new AppError('Mail servisi yapılandırması eksik.', 500);
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.senderEmail,
      subject: payload.subject,
      text: payload.textBody,
      html: payload.htmlBody,
      attachments: payload.attachments
    })
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new AppError(errorPayload.message || 'Mail gönderimi başarısız oldu.', 502);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  try {
    const body = parseRequestBody(event);

    // Honeypot alanı doluysa bot olarak sessizce başarı dön.
    if (String(body.website || '').trim() !== '') {
      return jsonResponse(200, { ok: true });
    }

    const fullName = sanitizeText(body.fullName, 120);
    const senderEmail = sanitizeText(body.senderEmail, 180);
    const subject = sanitizeText(body.subject, 180);
    const details = sanitizeText(body.details, 6000);
    const notes = sanitizeText(body.notes, 4000);
    const taskId = sanitizeText(body.taskId, 40);
    const taskTitle = sanitizeText(body.taskTitle, 180);
    const levelId = sanitizeText(body.levelId, 20);
    const captchaToken = sanitizeText(body.captchaToken, 2000);

    if (!fullName || !senderEmail || !subject || !details || !taskId || !taskTitle || !levelId) {
      return jsonResponse(400, { error: 'Zorunlu alanlar eksik.' });
    }

    if (!isValidEmail(senderEmail)) {
      return jsonResponse(400, { error: 'Geçerli bir e-posta girin.' });
    }

    const captchaOk = await verifyTurnstile(captchaToken, event.headers['x-forwarded-for']);
    if (!captchaOk) {
      return jsonResponse(400, { error: 'Captcha doğrulaması başarısız.' });
    }

    const attachments = normalizeAttachments(body.attachments);
    const submittedAt = new Date().toISOString();

    const textBody = [
      'Yeni görev teslim formu gönderildi.',
      '',
      `Gönderen: ${fullName}`,
      `E-posta: ${senderEmail}`,
      `Görev ID: ${taskId}`,
      `Görev Başlığı: ${taskTitle}`,
      `Seviye: ${levelId}`,
      `Zaman: ${submittedAt}`,
      '',
      'Konu:',
      subject,
      '',
      'Detay:',
      details,
      '',
      'Görev Notları:',
      notes || 'Not eklenmedi.',
      '',
      `Ek Dosya Sayısı: ${attachments.length}`
    ].join('\n');

    const htmlBody = `
      <h2>Yeni Görev Teslimi</h2>
      <p><strong>Gönderen:</strong> ${fullName}</p>
      <p><strong>E-posta:</strong> ${senderEmail}</p>
      <p><strong>Görev ID:</strong> ${taskId}</p>
      <p><strong>Görev Başlığı:</strong> ${taskTitle}</p>
      <p><strong>Seviye:</strong> ${levelId}</p>
      <p><strong>Zaman:</strong> ${submittedAt}</p>
      <hr />
      <p><strong>Konu:</strong> ${subject}</p>
      <p><strong>Detay:</strong></p>
      <p>${details.replace(/\n/g, '<br />')}</p>
      <p><strong>Görev Notları:</strong></p>
      <p>${(notes || 'Not eklenmedi.').replace(/\n/g, '<br />')}</p>
      <p><strong>Ek Dosya Sayısı:</strong> ${attachments.length}</p>
    `;

    await sendEmail({
      senderEmail,
      subject: `[Görev Teslimi] ${subject}`,
      textBody,
      htmlBody,
      attachments
    });

    return jsonResponse(200, {
      ok: true,
      message: 'Görev teslimi gönderildi.'
    });
  } catch (error) {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    return jsonResponse(statusCode, {
      error: error.message || 'Beklenmeyen bir hata oluştu.'
    });
  }
};
