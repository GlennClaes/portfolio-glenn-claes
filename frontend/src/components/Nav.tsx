'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BrandLogo } from '@/components/BrandLogo';
import { jumpTo } from '@/lib/navigation';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Lessons', id: 'lessons' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <Link
            href="#contact"
            className="btn btn-primary btn-sm nav-cta"
            onClick={jumpTo('contact')}
          >
            Contact me <ArrowRight aria-hidden="true" size={16} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
