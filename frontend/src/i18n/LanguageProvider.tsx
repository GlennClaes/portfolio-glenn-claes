'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { dictionaries, LOCALES, type Locale, type Messages } from '@/i18n/messages';

const STORAGE_KEY = 'glenn-locale';

// How long the current text fades out before the new language swaps in.
// Masks the reflow caused by translated strings having different lengths.
const FADE_OUT_MS = 150;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLocale = (value: string | null): value is Locale =>
  value !== null && (LOCALES as readonly string[]).includes(value);

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  const browserLocale = window.navigator.language.slice(0, 2).toLowerCase();
  return isLocale(browserLocale) ? browserLocale : 'en';
}

// Tiny external store so the current locale lives in localStorage without
// setState-in-effect (avoids hydration mismatches and cascading renders).
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener('storage', onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

const getSnapshot = (): Locale => getStoredLocale();
const getServerSnapshot = (): Locale => 'en';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [transitioning, setTransitioning] = useState(false);
  const swapTimer = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    setTransitioning(true);

    // Fade the current text out, then swap the language and fade back in.
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, next);
      listeners.forEach((listener) => listener());
      setTransitioning(false);
    }, FADE_OUT_MS);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, messages: dictionaries[locale] }}>
      <div className={`page-fade${transitioning ? ' is-fading' : ''}`}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
