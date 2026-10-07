import { NextResponse } from 'next/server';
import { SITE_CONTACT_EMAIL } from '@/lib/site-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type EnquiryKind = 'booking' | 'contact' | 'newsletter';
type Enquiry = Record<string, string | boolean | undefined> & { kind?: string };

type RateEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateEntry>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_BYTES = 12_000;

function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function deliveryFailureMessage() {
  return SITE_CONTACT_EMAIL
    ? `We could not deliver this enquiry just now. Please email ${SITE_CONTACT_EMAIL}.`
    : 'We could not deliver this enquiry just now. Please use the property’s verified contact details.';
}

type TextFieldResult = { value: string; error?: undefined } | { value?: undefined; error: string };

function textField(body: Enquiry, name: string, maxLength: number, required = false): TextFieldResult {
  const value = typeof body[name] === 'string' ? String(body[name]).trim() : '';
  if (required && !value) return { error: `Please provide ${name.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)}.` };
  if (value.length > maxLength) return { error: `Please keep ${name.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)} under ${maxLength} characters.` };
  return { value };
}

function emailIsValid(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function rateLimitKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return request.headers.get('x-real-ip') || forwarded || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  rateLimits.forEach((entry, candidate) => {
    if (entry.resetAt <= now) rateLimits.delete(candidate);
  });
  const entry = rateLimits.get(key);
  if (!entry || entry.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return true;
  entry.count += 1;
  return false;
}

type EnquiryDetails = { error: string } | { subject: string; replyTo: string; text: string };

function getEnquiryDetails(body: Enquiry, kind: EnquiryKind): EnquiryDetails {
  const name = textField(body, 'name', 100, kind !== 'newsletter');
  const email = textField(body, 'email', 254, true);
  const phone = textField(body, 'phone', 40);
  const interest = textField(body, 'interest', 120, kind !== 'newsletter');
  const source = textField(body, 'source', 80);
  const message = textField(body, 'message', 2_000);

  for (const field of [name, email, phone, interest, source, message]) {
    if (field.error) return { error: field.error };
  }
  const nameValue = name.value || '';
  const emailValue = email.value || '';
  const phoneValue = phone.value || '';
  const interestValue = interest.value || '';
  const sourceValue = source.value || '';
  const messageValue = message.value || '';
  if (!emailIsValid(emailValue)) return { error: 'Please enter a valid email address.' };

  if (kind === 'booking') {
    const mode = body.mode === 'clinic' ? 'clinic' : body.mode === 'resort' ? 'resort' : '';
    if (!mode) return { error: 'Please choose a resort or clinic enquiry.' };
    const details: string[] = [
      `Experience: ${mode === 'clinic' ? 'Wellness clinic' : 'Hotel resort'}`,
      `Name: ${nameValue}`,
      `Email: ${emailValue}`,
      `Phone: ${phoneValue || 'Not provided'}`,
      `Enquiry: ${interestValue}`,
      `Source: ${sourceValue || 'Website'}`,
    ];

    if (mode === 'resort') {
      const checkIn = textField(body, 'checkIn', 10, true);
      const checkOut = textField(body, 'checkOut', 10, true);
      const guests = textField(body, 'guests', 9, true);
      for (const field of [checkIn, checkOut, guests]) if (field.error) return { error: field.error };
      if (!isValidIsoDate(checkIn.value || '') || !isValidIsoDate(checkOut.value || '')) return { error: 'Please choose valid arrival and departure dates.' };
      const todayInIndia = new Date(Date.now() + 330 * 60_000).toISOString().slice(0, 10);
      if ((checkIn.value || '') < todayInIndia) return { error: 'Arrival cannot be in the past.' };
      if ((checkOut.value || '') <= (checkIn.value || '')) return { error: 'Departure must be after arrival.' };
      const guestCount = Number(guests.value);
      if (!Number.isSafeInteger(guestCount) || guestCount < 1) return { error: 'Please enter a positive whole number of guests.' };
      details.push(`Arrival: ${checkIn.value}`, `Departure: ${checkOut.value}`, `Guests: ${guestCount}`);
    } else {
      if (body.preferredContact !== 'email' && body.preferredContact !== 'phone') return { error: 'Please choose a valid preferred contact method.' };
      if (body.preferredContact === 'phone' && !phoneValue) return { error: 'Please provide a phone number for phone contact.' };
      details.push(`Preferred contact: ${body.preferredContact === 'phone' ? 'Phone' : 'Email'}`);
      if (messageValue) details.push(`Additional note: ${messageValue}`);
      details.push('No medical records or detailed health information were requested by this form.');
    }

    return { subject: `Website ${mode === 'clinic' ? 'clinic' : 'stay'} enquiry`, replyTo: emailValue, text: details.join('\n') };
  }

  if (kind === 'contact') {
    const details = [
      'Website contact enquiry',
      `Name: ${nameValue}`,
      `Email: ${emailValue}`,
      `Phone: ${phoneValue || 'Not provided'}`,
      `Topic: ${interestValue}`,
      `Message: ${messageValue}`,
      `Source: ${sourceValue || 'Contact page'}`,
      'Please do not treat this enquiry as a confirmed booking.',
    ];
    return { subject: 'Website contact enquiry', replyTo: emailValue, text: details.join('\n') };
  }

  const consent = body.consent === true || body.consent === 'true' || body.consent === 'on';
  if (!consent) return { error: 'Please confirm that you would like the operator to contact you about the newsletter.' };
  return {
    subject: 'Website newsletter sign-up request',
    replyTo: emailValue,
    text: [
      'A visitor has requested to join the Aranya seasonal newsletter.',
      `Email: ${emailValue}`,
      `Consent recorded at: ${new Date().toISOString()}`,
      'Please confirm the subscription with the visitor before adding them to a mailing list.',
    ].join('\n'),
  };
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) return jsonError('This request could not be verified.', 403);
    } catch {
      return jsonError('This request could not be verified.', 403);
    }
  }

  if (isRateLimited(rateLimitKey(request))) return jsonError('Too many requests. Please wait a few minutes and try again.', 429);

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) return jsonError('This enquiry is too large. Please shorten it and try again.', 413);

  let body: Enquiry;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) return jsonError('This enquiry is too large. Please shorten it and try again.', 413);
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return jsonError('Please check the form and try again.', 400);
    body = parsed as Enquiry;
  } catch {
    return jsonError('Please check the form and try again.', 400);
  }

  // Low-cost bot trap. Do not store or forward submissions that fill this field.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const kind = body.kind;
  if (kind !== 'booking' && kind !== 'contact' && kind !== 'newsletter') return jsonError('Please choose a valid enquiry type.', 400);

  const details = getEnquiryDetails(body, kind);
  if ('error' in details) return jsonError(details.error, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const recipient = process.env.ARANYA_LEADS_TO;
  if (!apiKey || !from || !recipient) {
    const message = SITE_CONTACT_EMAIL
      ? `Online enquiries are not connected yet. Please email ${SITE_CONTACT_EMAIL} directly.`
      : 'Online enquiries are not connected yet. Please use the property’s verified contact details once they are published.';
    return jsonError(message, 503);
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: details.replyTo,
        subject: details.subject,
        text: details.text,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      return jsonError(deliveryFailureMessage(), 502);
    }
  } catch {
    return jsonError(deliveryFailureMessage(), 502);
  }

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
