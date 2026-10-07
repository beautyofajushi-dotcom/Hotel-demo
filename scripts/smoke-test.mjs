import assert from 'node:assert/strict';

const baseUrl = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const routes = [
  '/', '/stay', '/spaces', '/wellness', '/dining', '/experiences',
  '/gallery', '/journal', '/contact', '/privacy', '/robots.txt', '/sitemap.xml',
];

async function main() {
  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `${route} should respond with 200`);
    const body = await response.text();
    if (route.startsWith('/') && !route.endsWith('.txt') && !route.endsWith('.xml')) {
      assert.match(body, /<main[^>]*id="main-content"/, `${route} should expose the main landmark`);
      assert.equal((body.match(/<h1(?:\s|>)/g) || []).length, 1, `${route} should contain one primary heading`);
    }
    console.log(`PASS ${route} → ${response.status}`);
  }

  const missingRoute = await fetch(`${baseUrl}/this-route-does-not-exist`);
  assert.equal(missingRoute.status, 404, 'unknown routes should return HTTP 404');
  assert.match(await missingRoute.text(), /This page isn.t|404/i, 'unknown routes should show the custom not-found page');
  console.log('PASS custom 404 route');

  const root = await fetch(baseUrl);
  const rootHtml = await root.text();
  const photoPause = rootHtml.match(/<section id="at-your-own-altitude" class="altitude-photo-only" aria-hidden="true">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(photoPause, 'homepage should include the full-bleed photo pause');
  assert.match(photoPause, /^<img alt=""/, 'the photo-only interval should have a decorative, empty-alt image');
  assert.doesNotMatch(photoPause, /<(?:div|span|p|h[1-6]|button|svg)\b/i, 'the photo-only interval should not contain text or geometric overlays');
  console.log('PASS homepage full-bleed photo-only interval');

  assert.match(rootHtml, /name="robots"[^>]*content="noindex,\s*nofollow"|content="noindex,\s*nofollow"[^>]*name="robots"/i, 'unconfigured preview should be noindex');
  assert.doesNotMatch(rootHtml, /rel="canonical"/, 'unconfigured preview should not advertise a placeholder canonical URL');

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  assert.match(robots, /Disallow:\s*\//, 'unconfigured preview should disallow crawling');
  const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
  assert.doesNotMatch(sitemap, /<url>\s*<loc>/, 'unconfigured preview sitemap should not contain placeholder URLs');
  console.log('PASS preview SEO is safely disabled until a production domain is configured');

  const headers = await fetch(baseUrl);
  assert.equal(headers.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(headers.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(headers.headers.get('permissions-policy'), 'camera=(), microphone=(), geolocation=()');
  assert.equal(headers.headers.get('x-powered-by'), null);
  console.log('PASS response security headers');

  const crossOrigin = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://untrusted.example',
      'x-forwarded-for': '198.51.100.10',
    },
    body: JSON.stringify({ kind: 'contact' }),
  });
  assert.equal(crossOrigin.status, 403, 'cross-origin form posts should be rejected');
  console.log('PASS cross-origin API protection');

  const invalidEmail = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: baseUrl,
      'x-forwarded-for': '198.51.100.11',
    },
    body: JSON.stringify({
      kind: 'contact', name: 'Smoke Test', email: 'not-an-email', interest: 'general', message: 'Validation only',
    }),
  });
  assert.equal(invalidEmail.status, 400, 'invalid email should be rejected');
  console.log('PASS email validation');

  const missingClinicPhone = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: baseUrl,
      'x-forwarded-for': '198.51.100.17',
    },
    body: JSON.stringify({
      kind: 'booking', mode: 'clinic', name: 'Smoke Test', email: 'test@example.com',
      interest: 'general', preferredContact: 'phone',
    }),
  });
  assert.equal(missingClinicPhone.status, 400, 'clinic phone preference should require a phone number');
  assert.match((await missingClinicPhone.json()).error, /phone number/i);
  console.log('PASS clinic preferred-contact validation');

  const noConsent = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: baseUrl,
      'x-forwarded-for': '198.51.100.15',
    },
    body: JSON.stringify({ kind: 'newsletter', email: 'test@example.com', consent: false }),
  });
  assert.equal(noConsent.status, 400, 'newsletter requests require explicit consent');
  console.log('PASS newsletter consent requirement');

  const limitedAddress = '198.51.100.16';
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(`${baseUrl}/api/enquiries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: baseUrl,
        'x-forwarded-for': limitedAddress,
      },
      body: JSON.stringify({ kind: 'contact', name: 'Rate Test', email: 'invalid', interest: 'general' }),
    });
    assert.equal(response.status, 400, `request ${attempt} should reach validation before the limit`);
  }
  const rateLimited = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: baseUrl,
      'x-forwarded-for': limitedAddress,
    },
    body: JSON.stringify({ kind: 'contact', name: 'Rate Test', email: 'invalid', interest: 'general' }),
  });
  assert.equal(rateLimited.status, 429, 'requests over the per-address limit should be rejected');
  console.log('PASS per-address rate limit');

  const impossibleDate = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: baseUrl,
      'x-forwarded-for': '198.51.100.12',
    },
    body: JSON.stringify({
      kind: 'booking', mode: 'resort', name: 'Smoke Test', email: 'test@example.com', interest: 'hotel-stay',
      checkIn: '2026-02-30', checkOut: '2026-03-01', guests: '2',
    }),
  });
  assert.equal(impossibleDate.status, 400, 'impossible calendar dates should be rejected');
  console.log('PASS calendar-date validation');

  const oversized = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: baseUrl,
      'x-forwarded-for': '198.51.100.13',
    },
    body: JSON.stringify({ kind: 'contact', message: 'x'.repeat(13_000) }),
  });
  assert.equal(oversized.status, 413, 'oversized requests should be rejected');
  console.log('PASS request-size limit');

  const imageResponse = await fetch(`${baseUrl}/images/kumaon-retreat.webp`);
  assert.equal(imageResponse.status, 200, 'local illustrative image should be served');
  assert.match(imageResponse.headers.get('content-type') || '', /image\/webp/);
  const optimizedImage = await fetch(`${baseUrl}/_next/image?url=${encodeURIComponent('/images/kumaon-retreat.webp')}&w=640&q=75`, {
    headers: { accept: 'image/avif,image/webp,*/*' },
  });
  assert.equal(optimizedImage.status, 200, 'Next Image should optimize local images');
  assert.match(optimizedImage.headers.get('content-type') || '', /image\/(?:avif|webp|jpeg|png)/);
  console.log('PASS local WebP asset and Next Image optimization');

  const mailConfigPresent = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.ARANYA_LEADS_TO);
  if (mailConfigPresent) {
    console.log('SKIP provider submission check to avoid sending a live enquiry from the smoke test');
  } else {
    const checkIn = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const checkOut = new Date(Date.now() + 91 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const validEnquiry = await fetch(`${baseUrl}/api/enquiries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: baseUrl,
        'x-forwarded-for': '198.51.100.14',
      },
      body: JSON.stringify({
        kind: 'booking', mode: 'resort', name: 'Smoke Test', email: 'test@example.com', interest: 'hotel-stay',
        checkIn, checkOut, guests: '12', source: 'smoke-test',
      }),
    });
    assert.equal(validEnquiry.status, 503, 'valid enquiry should not falsely succeed without a delivery provider');
    const failure = await validEnquiry.json();
    assert.equal(failure.ok, false);
    assert.match(failure.error, /not connected/i);
    console.log('PASS booking validation has no assumed eight-guest cap; delivery failure stays explicit');
  }

  console.log('\nAll production smoke checks passed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
