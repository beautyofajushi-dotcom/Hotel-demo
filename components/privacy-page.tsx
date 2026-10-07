import Link from 'next/link';
import { SITE_CONTACT_EMAIL, SITE_EMAIL_LINK } from '@/lib/site-config';

export function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page">
      <article className="legal-content">
        <span className="eyebrow"><span className="eyebrow-line" />YOUR INFORMATION, HANDLED WITH CARE</span>
        <h1>Privacy & enquiries.</h1>
        <p className="legal-updated">Website privacy notice · 7 October 2026</p>

        <div className="legal-notice">
          <p>This is a draft notice for an enquiry preview, not a booking or clinical-record system. A submitted stay enquiry is not a confirmed reservation, and a clinic enquiry is not an appointment or medical consultation. The operator must review this notice against its actual services, vendors and retention practices before launch.</p>
        </div>

        <section>
          <h2>Information you choose to share</h2>
          <p>Depending on the form, we may receive your name, email address, optional telephone number, enquiry topic, requested stay dates, guest count, and a brief message. Newsletter requests include your email address and consent to be contacted about seasonal letters.</p>
          <p>Please do not send medical records, detailed health histories, payment-card details, identity documents, or other sensitive information through these website forms. The operator should provide a secure, appropriate channel before requesting any sensitive information.</p>
        </section>

        <section>
          <h2>How an enquiry is handled</h2>
          <p>When the website email integration is configured, form details are sent through Resend and delivered to the recipient configured for this deployment. The website does not keep enquiry content in its own database. Resend and the receiving mailbox process the message as part of delivery; their own privacy and retention terms also apply.</p>
          <p>If email delivery is not configured or temporarily unavailable, the form reports that it could not send your enquiry and—when a verified contact email is configured—offers a prefilled email link. It never reports success in that case.</p>
          <p>Newsletter forms send a sign-up request to the configured recipient. They do not automatically enrol you or send marketing messages. The operator must confirm your request before adding an address to a mailing list.</p>
        </section>

        <section>
          <h2>Preferences and abuse prevention</h2>
          <p>The browser stores your selected resort/clinic experience and optional interface-sound preference in local storage; you can clear them in your browser settings. The enquiry endpoint also temporarily processes a network address in an in-memory rate limiter to reduce automated abuse. It is not saved as an enquiry record and is eligible for removal after 15 minutes (or when the server process restarts).</p>
          <p>The site does not include advertising or analytics trackers in this build.</p>
        </section>

        <section>
          <h2>Access, correction, or deletion</h2>
          <p>For questions about an enquiry, or to ask the operator to correct or delete information held in its mailbox, {SITE_CONTACT_EMAIL ? <>email <a href={SITE_EMAIL_LINK}>{SITE_CONTACT_EMAIL}</a>.</> : <>use the operator&apos;s verified contact channel once it is published; no contact email is configured in this preview.</>} Mailbox retention and access should be reviewed by the operator before launch.</p>
        </section>

        <section>
          <h2>Before travelling or booking</h2>
          <p>Availability, rates, inclusions, cancellation terms, exact property directions, clinic services and provider details are not verified in this preview. Confirm them directly with the operator. Sending a form does not reserve a room or confirm an appointment; wait for written confirmation before making non-refundable travel arrangements.</p>
          <p>For urgent or emergency medical concerns, contact local emergency services or a qualified local healthcare provider. This website is not an emergency-care service.</p>
        </section>

        <p>For general questions, visit <Link href="/contact">Contact Aranya</Link>.</p>
      </article>
    </main>
  );
}
