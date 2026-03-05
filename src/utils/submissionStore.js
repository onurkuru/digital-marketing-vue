const STORAGE_KEY = 'digital_marketing_task_submissions_v1';
const SUBMISSION_EVENT = 'learning-submissions-updated';

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function sanitizeText(value, maxLength = 5000) {
  return String(value || '').trim().slice(0, maxLength);
}

function normalizeAttachment(attachment) {
  return {
    name: sanitizeText(attachment?.name, 180),
    type: sanitizeText(attachment?.type, 120) || 'application/octet-stream',
    size: Number(attachment?.size || 0) || 0
  };
}

function normalizeSubmission(submission, index = 0) {
  const submittedAt = sanitizeText(submission?.submittedAt, 80) || new Date().toISOString();
  const attachments = Array.isArray(submission?.attachments)
    ? submission.attachments.map((item) => normalizeAttachment(item)).filter((item) => item.name)
    : [];

  return {
    id: sanitizeText(submission?.id, 80) || `${Date.now()}-${index}`,
    taskId: sanitizeText(submission?.taskId, 40),
    taskTitle: sanitizeText(submission?.taskTitle, 180),
    levelId: sanitizeText(submission?.levelId, 20),
    fullName: sanitizeText(submission?.fullName, 120),
    senderEmail: sanitizeText(submission?.senderEmail, 180),
    subject: sanitizeText(submission?.subject, 180),
    details: sanitizeText(submission?.details, 6000),
    notes: sanitizeText(submission?.notes, 4000),
    status: sanitizeText(submission?.status, 20) || 'pending',
    submittedAt,
    updatedAt: sanitizeText(submission?.updatedAt, 80) || submittedAt,
    attachmentCount: attachments.length,
    attachments
  };
}

function normalizeSubmissionList(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => normalizeSubmission(item, index));
}

function emitSubmissionsUpdated(submissions) {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(SUBMISSION_EVENT, { detail: submissions }));
}

export function loadSubmissions() {
  if (!isBrowser()) return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const normalized = normalizeSubmissionList(JSON.parse(raw));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (error) {
    const fallback = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
}

export function saveSubmissions(submissions) {
  const normalized = normalizeSubmissionList(submissions);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    emitSubmissionsUpdated(normalized);
  }
  return normalized;
}

export function addSubmission(submission) {
  const submissions = loadSubmissions();
  const saved = normalizeSubmission({
    ...submission,
    id: submission?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: submission?.submittedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  submissions.unshift(saved);
  return saveSubmissions(submissions);
}

export function subscribeSubmissions(listener) {
  if (!isBrowser()) {
    return () => {};
  }

  const handler = (event) => {
    if (typeof listener === 'function') {
      listener(normalizeSubmissionList(event.detail || []));
    }
  };

  window.addEventListener(SUBMISSION_EVENT, handler);
  return () => {
    window.removeEventListener(SUBMISSION_EVENT, handler);
  };
}
