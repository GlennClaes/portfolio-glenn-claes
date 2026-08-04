'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/i18n/LanguageProvider';
import { jumpTo } from '@/lib/navigation';

export function Nav() {
  const { messages } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: messages.nav.about, id: 'about' },
    { label: messages.nav.services, id: 'services' },
    { label: messages.nav.projects, id: 'projects' },
    { label: messages.nav.process, id: 'process' },
  ];

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
      </div>
    </nav>
  );
}
