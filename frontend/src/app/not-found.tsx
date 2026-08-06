'use client';

import Link from 'next/link';

import { useLanguage } from '@/i18n/LanguageProvider';
import { jumpTo } from '@/lib/navigation';

export default function NotFound() {
  const { messages } = useLanguage();

  return (
    <main className="notfound">
      <Link href="#top" className="notfound-logo" onClick={jumpTo('top')}>
        <span className="notfound-logo-mark" aria-hidden="true">
          G
        </span>
      </Link>
      <h1 className="h-display">{messages.notFound.title}</h1>
      <p className="lead mt-22">{messages.notFound.heading}</p>
      <p className="mt-10 notfound-msg">{messages.notFound.message}</p>
      <Link href="#top" className="btn btn-primary mt-28" onClick={jumpTo('top')}>
        {messages.notFound.backHome}
      </Link>
    </main>
  );
}
