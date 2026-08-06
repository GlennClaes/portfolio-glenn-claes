'use client';

import Link from 'next/link';

import { useLanguage } from '@/i18n/LanguageProvider';

export default function NotFound() {
  const { messages } = useLanguage();

  return (
    <main className="notfound">
      <Link href="/" className="notfound-logo" aria-label={messages.notFound.backHome}>
        <span className="notfound-logo-mark" aria-hidden="true">
          G
        </span>
      </Link>
      <h1 className="h-display">{messages.notFound.title}</h1>
      <p className="lead mt-22">{messages.notFound.heading}</p>
      <p className="mt-10 notfound-msg">{messages.notFound.message}</p>
      <Link href="/" className="btn btn-primary mt-28">
        {messages.notFound.backHome}
      </Link>
    </main>
  );
}
