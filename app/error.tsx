'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content" className="not-found-page error-page">
      <span className="eyebrow"><span className="eyebrow-line" />A MOMENT, PLEASE</span>
      <h1>We lost our<br /><em>place for a moment.</em></h1>
      <p>This page could not be displayed. If you submitted an enquiry just before this message, check your email before sending it again.</p>
      <div className="not-found-links">
        <button className="button button-primary" type="button" onClick={() => reset()}>Try again</button>
        <a className="text-link" href="/">Return home</a>
      </div>
    </main>
  );
}
