'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type RefObject, type ReactNode } from 'react';

type DialogPortalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  initialFocusRef?: RefObject<HTMLElement | null>;
};

const FOCUSABLE = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([type="hidden"]):not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function DialogFocusBoundary({
  onClose,
  initialFocusRef,
  children,
}: Omit<DialogPortalProps, 'open'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const initialFocusRefRef = useRef(initialFocusRef);
  onCloseRef.current = onClose;
  initialFocusRefRef.current = initialFocusRef;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const appRoot = document.querySelector<HTMLElement>('.site-root');
    const wasInert = appRoot?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (appRoot) appRoot.inert = true;
    document.body.style.overflow = 'hidden';

    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => {
      const style = window.getComputedStyle(element);
      return !element.closest('[hidden], [inert], [aria-hidden="true"]')
        && !element.hasAttribute('disabled')
        && style.display !== 'none'
        && style.visibility !== 'hidden'
        && element.getClientRects().length > 0;
    });

    const focusTimer = window.requestAnimationFrame(() => {
      const preferred = initialFocusRefRef.current?.current;
      const first = getFocusable()[0];
      (preferred && !preferred.hasAttribute('disabled') ? preferred : first ?? container).focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      if (appRoot) appRoot.inert = wasInert;
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) window.requestAnimationFrame(() => previouslyFocused.focus());
    };
  }, []);

  return <div ref={containerRef} className="dialog-portal-content" tabIndex={-1}>{children}</div>;
}

export function DialogPortal({ open, onClose, initialFocusRef, children }: DialogPortalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!open || !portalTarget) return null;
  return createPortal(
    <DialogFocusBoundary onClose={onClose} initialFocusRef={initialFocusRef}>{children}</DialogFocusBoundary>,
    portalTarget,
  );
}
