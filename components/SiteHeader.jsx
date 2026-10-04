'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useBooking } from '@/components/BookingProvider';

const links = [
  { href: '/', label: 'The hotel' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/dining', label: 'Dining' },
  { href: '/experiences', label: 'Agra' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const firstLink = document.querySelector('#mobile-navigation a');
    const frame = window.requestAnimationFrame(() => firstLink?.focus());
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="Mirāan Agra home" onClick={closeMenu}>
          <span className="brand-monogram" aria-hidden="true">M</span>
          <span className="brand-title">MIRĀAN<small>THE TAJ · THE CITY · THE STAY</small></span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((item) => <Link className="nav-link" href={item.href} key={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <div className="header-actions"><span className="header-locale">AGRA · INDIA</span><button className="header-book" type="button" onClick={() => openBooking()}>Reserve your stay <span aria-hidden="true">↗</span></button></div>
        <button className="menu-toggle" ref={menuToggleRef} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
      </div>
      <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
        {links.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={closeMenu}>{item.label}</Link>)}
        <button className="button-gold mt-4 w-full" type="button" onClick={() => { closeMenu(); openBooking(); }}>Reserve your stay <span className="button-arrow">↗</span></button>
      </nav>
    </header>
  );
}
