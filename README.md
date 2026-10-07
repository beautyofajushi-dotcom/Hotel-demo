# Aranya Himalayan Hotel Resort & Wellness Clinic

A Next.js enquiry-site preview for two clearly separated experiences: a Himalayan hotel resort and a wellness clinic, shown in a Kumaon, Uttarakhand setting. It is not a live reservation, availability, payment or clinical-record system.

**All bundled images and editorial copy are illustrative concept material, not verified photographs, property details, service descriptions, testimonials or operating policies. Replace and approve them before public launch.**

## Run locally

```bash
npm ci
npm run dev
```

The app binds to `0.0.0.0` for preview environments. Production checks:

```bash
npm run typecheck
npm run build
npm audit --audit-level=moderate
npm start
# In a second terminal, with the production server running:
npm run test:smoke
```

## Pages

- `/` — resort / clinic experience switch and separate entry points.
- `/stay` — hotel-resort enquiry guidance; room and facility details need verification.
- `/spaces` — experience-aware cards with accessible detail dialogs.
- `/wellness` — clinic enquiry guidance and provider-safety checklist.
- `/dining` — clearly labelled sample dishes, not a live menu.
- `/experiences` — prompts for asking about currently available activities.
- `/gallery` — illustrative concept imagery with keyboard-accessible lightbox.
- `/journal` — sample editorial drafts and newsletter-interest request form.
- `/contact` — enquiry form, approximate region map, and configured contact details when supplied.
- `/privacy` — draft enquiry and preference privacy notice for operator review.

## Configure before launch

Copy `.env.example` to `.env.local`. Supply verified values only. Never commit `.env.local` or expose server secrets with a `NEXT_PUBLIC_` prefix. Until a valid `NEXT_PUBLIC_SITE_URL` is supplied, the site sends `noindex` metadata, disallows crawling in `robots.txt`, and emits an empty sitemap.

### Enquiry delivery

Booking, contact and newsletter-interest forms post to `/api/enquiries`. The booking form submits an **enquiry only**; it does not check availability or reserve a room. Clinic submissions are not appointments, diagnoses or medical recommendations. No visitor sees a success state unless the configured email provider accepts the message.

Set these server-only Resend values:

```env
RESEND_API_KEY=your-server-only-key
RESEND_FROM_EMAIL=Aranya Website <website@your-verified-domain.example>
ARANYA_LEADS_TO=the-inbox-your-team-monitors@example.com
```

Verify the sender domain with Resend and use an inbox monitored by the responsible operator. Without a configured sender, recipient and API key, form submission returns an error; when a verified public email is configured, visitors also get a prefilled email fallback. Test delivery end-to-end before launch.

The endpoint validates fields and calendar dates, limits request size, checks same-origin browser requests, uses a honeypot, and applies a best-effort in-process rate limit. This rate limit is per running instance; multi-instance or serverless deployments should also use a shared edge/provider rate limiter. Newsletter requests are sent to the team for manual confirmation; the site does not automatically subscribe visitors or send marketing email.

### Verified property and contact information

Set these public values from verified business records before building; `NEXT_PUBLIC_` values are embedded into the generated site, so rebuild after changes:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_CONTACT_EMAIL=team@your-verified-domain.example
NEXT_PUBLIC_CONTACT_PHONE=+91...
NEXT_PUBLIC_WHATSAPP_PHONE=91...
NEXT_PUBLIC_PROPERTY_ADDRESS=Full verified postal address
NEXT_PUBLIC_MAPS_URL=https://maps.google.com/?q=verified-property-pin
```

WhatsApp and phone actions appear only when configured. Email links are hidden until a syntactically valid contact email is supplied. Without a verified address or map URL, the page labels the Kumaon locator as approximate and tells visitors not to use it as an arrival point.

Before accepting real enquiries, verify the legal business identity, actual location and map pin, room inventory, amenities, accessibility, dining menu and food-safety details, activity schedule and providers, clinic service scope, practitioner qualifications and registration, fees, availability, payment/cancellation terms, privacy practices, mailbox access/retention, and emergency information. Remove or replace every illustrative image and sample editorial draft with approved, fact-checked material.

## Privacy and clinic safety

The application does not write enquiry content to its own database. If Resend is configured, enquiry details pass through Resend to the configured team inbox; those services' privacy and retention terms apply. The in-memory abuse limiter temporarily processes a network address. The privacy page explains local-storage preferences and asks visitors not to send detailed health information through general web forms. The privacy notice is a draft and must be reconciled with the operator's actual vendors, practices and applicable obligations before launch.

The clinic page intentionally avoids advertising specific treatments, outcomes or unverified credentials. The operator must publish its verified scope and responsible provider information before accepting clinic enquiries. The site is not an emergency-care service.

## Motion, accessibility and performance

GSAP provides optional entrance/scroll reveals; Lenis smooth scrolling and animation are disabled when reduced motion is requested. Dialogs implement focus trapping, restoration, Escape handling and background inertness. Local concept images use Next Image optimization and route heroes are prioritized. Build/typecheck checks are not a substitute for real-device visual, keyboard, screen-reader, form, privacy and delivery tests before release.
