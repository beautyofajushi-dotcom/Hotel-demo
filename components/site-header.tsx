'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useExperience, type ExperienceMode } from './experience-context';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/stay', label: 'Stay' },
  { href: '/spaces', label: 'Spaces' },
  { href: '/wellness', label: 'Wellness clinic' },
  { href: '/dining', label: 'Dining' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/journal', label: 'Journal' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode, openBooking, playTick } = useExperience();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, [pathname]);

  useEffect(() => {
    const mobileMenu = window.matchMedia('(max-width: 1280px)');
    const onResize = () => {
      if (!mobileMenu.matches) setMenuOpen(false);
    };
    mobileMenu.addEventListener('change', onResize);
    return () => mobileMenu.removeEventListener('change', onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const nav = navRef.current;
    const header = headerRef.current;
    if (!nav || !header) return;

    const previousOverflow = document.body.style.overflow;
    const appRoot = header.closest<HTMLElement>('.site-root');
    const inertSiblings = appRoot
      ? Array.from(appRoot.children).filter((element) => element !== header).map((element) => ({
        element: element as HTMLElement,
        wasInert: (element as HTMLElement).inert,
      }))
      : [];
    document.body.style.overflow = 'hidden';
    inertSiblings.forEach(({ element }) => { element.inert = true; });

    const focusFrame = window.requestAnimationFrame(() => nav.querySelector<HTMLAnchorElement>('a[href]')?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(nav.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        .filter((element) => element.getClientRects().length > 0 && element.getAttribute('tabindex') !== '-1');
      if (!focusable.length) {
        event.preventDefault();
        menuButtonRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !nav.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !nav.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertSiblings.forEach(({ element, wasInert }) => { element.inert = wasInert; });
    };
  }, [menuOpen]);

  const chooseMode = (nextMode: ExperienceMode) => {
    setMode(nextMode);
    playTick();
    if (nextMode === 'clinic' && pathname !== '/' && pathname !== '/spaces' && pathname !== '/wellness') router.push('/wellness');
    if (nextMode === 'resort' && pathname === '/wellness') router.push('/');
  };

  return (
    <header id="top" ref={headerRef} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="Aranya Himalayan Hotel Resort and Wellness Clinic home" onClick={playTick}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 34 34" fill="none">
              <path d="M17 3.5 30 27H4L17 3.5Z" stroke="currentColor" strokeWidth="1.15" />
              <path d="M17 12.3 25 27H9l8-14.7Z" stroke="currentColor" strokeWidth="1.05" />
              <path d="M17 20.2V30" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
          <span className="brand-wordmark">ARANYA<span>HOTEL RESORT · WELLNESS CLINIC</span></span>
        </Link>

        <nav id="primary-navigation" ref={navRef} className={`desktop-nav ${menuOpen ? 'mobile-nav-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={playTick}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mobile-mode-control">
            <ExperienceSwitch mode={mode} onChange={chooseMode} />
          </div>
        </nav>

        <div className="header-actions">
          <div className="desktop-mode-control">
            <ExperienceSwitch mode={mode} onChange={chooseMode} />
          </div>
          <button type="button" className="header-booking" onClick={() => { setMenuOpen(false); playTick(); openBooking({ mode, source: 'header-enquiry' }); }}>
            <span>Enquire</span><ArrowUpRight size={14} strokeWidth={1.4} />
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => { setMenuOpen((open) => !open); playTick(); }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && <button className="mobile-nav-backdrop" type="button" tabIndex={-1} aria-label="Close the navigation menu" onClick={() => { setMenuOpen(false); menuButtonRef.current?.focus(); }} />}
    </header>
  );
}

function ExperienceSwitch({ mode, onChange }: { mode: ExperienceMode; onChange: (mode: ExperienceMode) => void }) {
  return (
    <div className="experience-switch" role="group" aria-label="Choose the hotel resort or wellness clinic">
      <button
        type="button"
        aria-pressed={mode === 'resort'}
        className={mode === 'resort' ? 'selected' : ''}
        onClick={() => onChange('resort')}
      >
        <span className="switch-dot" /> Hotel resort
      </button>
      <button
        type="button"
        aria-pressed={mode === 'clinic'}
        className={mode === 'clinic' ? 'selected' : ''}
        onClick={() => onChange('clinic')}
      >
        <span className="switch-dot" /> Wellness clinic
      </button>
    </div>
  );
}
