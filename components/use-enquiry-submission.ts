'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { SITE_CONTACT_EMAIL } from '@/lib/site-config';

export type EnquiryKind = 'booking' | 'contact' | 'newsletter';
export type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export function useEnquirySubmission() {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState('');
  const [fallbackHref, setFallbackHref] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>, kind: EnquiryKind, extraFields: Record<string, string> = {}): Promise<boolean> => {
    event.preventDefault();
    if (status === 'sending') return false;

    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === 'string' ? value : '',
    ]));
    const subject = kind === 'booking' ? 'Aranya website enquiry' : kind === 'newsletter' ? 'Aranya newsletter request' : 'Aranya contact enquiry';
    const body = Object.entries({ ...fields, ...extraFields })
      .filter(([key, value]) => key !== 'website' && key !== 'consent' && value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    setFallbackHref(SITE_CONTACT_EMAIL
      ? `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      : '');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, ...extraFields, kind }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || 'We could not send that enquiry. Please try again.');
      setStatus('success');
      return true;
    } catch (cause) {
      setStatus('error');
      setError(cause instanceof Error ? cause.message : 'We could not send that enquiry. Please try again.');
      return false;
    }
  };

  const reset = useCallback(() => {
    setStatus('idle');
    setError('');
    setFallbackHref('');
  }, []);

  return { status, error, fallbackHref, submit, reset };
}
