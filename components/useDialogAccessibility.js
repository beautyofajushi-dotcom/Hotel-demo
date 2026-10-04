'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function useDialogAccessibility(open, onClose, initialFocusSelector) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    document.body.classList.add('modal-open');
    const getFocusable = () => [...(dialogRef.current?.querySelectorAll(FOCUSABLE) || [])]
      .filter((element) => element.getClientRects().length > 0 && !element.hasAttribute('hidden'));
    const firstCandidate = initialFocusSelector ? dialogRef.current?.querySelector(initialFocusSelector) : null;
    const frame = window.requestAnimationFrame(() => (firstCandidate || getFocusable()[0] || dialogRef.current)?.focus());

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open, initialFocusSelector]);

  return dialogRef;
}
