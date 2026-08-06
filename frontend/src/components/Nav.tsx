'use client';

import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageProvider';
import { jumpTo } from '@/lib/navigation';

export function Nav() {
  const { messages } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu when switching back to a desktop viewport so the two don't conflict.
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 761px)').matches) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close on Escape and lock page scroll while the menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  const navItems = [
    { label: messages.nav.about, id: 'about' },
    { label: messages.nav.services, id: 'services' },
    { label: messages.nav.projects, id: 'projects' },
    { label: messages.nav.process, id: 'process' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container nav-inner">
        <BrandLogo />

        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.id} href={`#${item.id}`} className="nav-link" onClick={jumpTo(item.id)}>
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href="#contact"
            className="btn btn-primary btn-sm nav-cta"
            onClick={jumpTo('contact')}
          >
            {messages.nav.contact} <ArrowRight aria-hidden="true" size={16} strokeWidth={2.2} />
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? (
            <X aria-hidden="true" size={22} strokeWidth={2.2} />
          ) : (
            <Menu aria-hidden="true" size={22} strokeWidth={2.2} />
          )}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <nav className="mobile-menu-inner" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="mobile-link"
              onClick={() => {
                jumpTo(item.id)();
                closeMenu();
              }}
            >
              {item.label}
            </Link>
          ))}

          <div className="mobile-menu-footer">
            <LanguageSwitcher />
            <Link
              href="#contact"
              className="btn btn-primary btn-sm mobile-cta"
              onClick={() => {
                jumpTo('contact')();
                closeMenu();
              }}
            >
              {messages.nav.contact} <ArrowRight aria-hidden="true" size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </nav>
      </div>
    </nav>
  );
}
