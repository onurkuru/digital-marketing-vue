function jsonResponse(payload) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(payload)
  };
}

function firstNonEmpty(...values) {
  return values
    .map((value) => String(value || '').trim())
    .find((value) => value.length > 0) || '';
}

exports.handler = async () => {
  const turnstileSiteKey = firstNonEmpty(
    process.env.VITE_TURNSTILE_SITE_KEY,
    process.env.TURNSTILE_SITE_KEY
  );
  const recaptchaSiteKey = firstNonEmpty(
    process.env.VITE_RECAPTCHA_SITE_KEY,
    process.env.VITE_SITE_RECAPTCHA_KEY,
    process.env.SITE_RECAPTCHA_KEY
  );

  const provider = turnstileSiteKey
    ? 'turnstile'
    : (recaptchaSiteKey ? 'recaptcha' : '');
  const siteKey = turnstileSiteKey || recaptchaSiteKey;

  return jsonResponse({
    captcha: {
      provider,
      siteKey
    }
  });
};
