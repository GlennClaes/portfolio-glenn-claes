'use client';

import { Check, ChevronDown, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useLanguage } from '@/i18n/LanguageProvider';
import { LOCALES, type Locale } from '@/i18n/messages';

const languageNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
};

export function LanguageSwitcher() {
  const { locale, setLocale, messages } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={messages.nav.changeLanguage}
        onClick={() => setOpen((current) => !current)}
      >
        <Globe aria-hidden="true" size={15} strokeWidth={2} />
        <span className="lang-code">{locale.toUpperCase()}</span>
        <ChevronDown
          aria-hidden="true"
          size={14}
          strokeWidth={2}
          className={`lang-chevron${open ? ' open' : ''}`}
        />
      </button>

      {open ? (
        <div className="lang-menu" role="listbox" aria-label={messages.nav.changeLanguage}>
          {LOCALES.map((code) => {
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={active}
                className={`lang-item${active ? ' is-active' : ''}`}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
              >
                <span className="lang-code">{code.toUpperCase()}</span>
                <span className="lang-name">{languageNames[code]}</span>
                {active ? <Check aria-hidden="true" size={14} strokeWidth={2.4} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
