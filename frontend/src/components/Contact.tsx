'use client';

import { ArrowRight, Check, Clock3, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useLanguage } from '@/i18n/LanguageProvider';
import type { ContactPreset } from '@/lib/navigation';

export const CONTACT_EMAIL = 'contact@glennclaes.be';

interface ContactForm {
  name: string;
  email: string;
  type: string;
  message: string;
}

type ErrorKey = keyof Pick<ContactForm, 'name' | 'email' | 'message'>;
type ContactErrors = Partial<Record<ErrorKey, string>>;

const initialForm: ContactForm = {
  name: '',
  email: '',
  type: 'Website',
  message: '',
};

export function Contact() {
  const { messages } = useLanguage();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const update = (key: keyof ContactForm) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    };
  };

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<ContactPreset>).detail ?? {};
      setForm((current) => ({
        name: detail.name ?? current.name,
        email: detail.email ?? current.email,
        type: detail.type ?? current.type,
        message: detail.message ?? current.message,
      }));
      setErrors({});
      setSent(false);

      if (detail.focus === 'message') {
        window.setTimeout(() => {
          const element = messageRef.current;
          if (!element) return;
          element.focus();
          element.setSelectionRange(element.value.length, element.value.length);
        }, 650);
      }
    };

    window.addEventListener('open-contact', onPrefill);
    return () => window.removeEventListener('open-contact', onPrefill);
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ContactErrors = {};
    if (!form.name.trim()) nextErrors.name = messages.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = messages.contact.errEmail;
    }
    if (!form.message.trim() || form.message.trim().length < 8) {
      nextErrors.message = messages.contact.errMessage;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `[${form.type}] ${messages.contact.enquiry} ${form.name}`;
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Project type: ${form.type}\n\n` +
      `${form.message}\n`;
    const href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
    window.setTimeout(() => setSent(false), 8000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <span className="eyebrow">{messages.contact.eyebrow}</span>
            <h2 className="h-section">{messages.contact.heading}</h2>
          </div>
          <p className="lead reveal" data-delay="1">
            {messages.contact.lead}
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card reveal">
            <span className="eyebrow">{messages.contact.directEyebrow}</span>
            <h3 className="h-card mt-14">{messages.contact.directHeading}</h3>
            <p className="body-mute mt-10">{messages.contact.directText}</p>
            <Link
              className="contact-channel contact-channel-link"
              href="mailto:contact@glennclaes.be?subject=Quick%20hello"
            >
              <div className="ic">
                <Mail aria-hidden="true" size={18} strokeWidth={1.8} />
              </div>
              <div>
                <b>contact@glennclaes.be</b>
                <span>{messages.contact.emailSpan}</span>
              </div>
            </Link>
            <Link
              className="contact-channel contact-channel-link"
              href="https://www.google.com/maps/place/Belgium"
              target="_blank"
              rel="noreferrer"
            >
              <div className="ic">
                <MapPin aria-hidden="true" size={18} strokeWidth={1.8} />
              </div>
              <div>
                <b>{messages.contact.locationLabel}</b>
                <span>{messages.contact.locationSpan}</span>
              </div>
            </Link>
            <div className="contact-channel">
              <div className="ic">
                <Clock3 aria-hidden="true" size={18} strokeWidth={1.8} />
              </div>
              <div>
                <b>{messages.contact.responseLabel}</b>
                <span>{messages.contact.responseSpan}</span>
              </div>
            </div>
          </div>

          <form className="card reveal contact-form" data-delay="1" onSubmit={submit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">{messages.contact.nameLabel}</label>
                <input
                  id="name"
                  type="text"
                  placeholder={messages.contact.namePlaceholder}
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name ? (
                  <span id="name-error" role="alert" className="field-error">
                    {errors.name}
                  </span>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="email">{messages.contact.emailLabel}</label>
                <input
                  id="email"
                  type="email"
                  placeholder={messages.contact.emailPlaceholder}
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <span id="email-error" role="alert" className="field-error">
                    {errors.email}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="field mt-16">
              <label htmlFor="type">{messages.contact.typeLabel}</label>
              <select id="type" value={form.type} onChange={update('type')}>
                {messages.contact.typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field mt-16">
              <label htmlFor="message">{messages.contact.messageLabel}</label>
              <textarea
                id="message"
                rows={5}
                ref={messageRef}
                placeholder={messages.contact.messagePlaceholder}
                value={form.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <span id="message-error" role="alert" className="field-error">
                  {errors.message}
                </span>
              ) : null}
            </div>
            <p className="form-hint">{messages.contact.sendHint}</p>
            <div className="form-bottom">
              <span>{messages.contact.noSpam}</span>
              <button className="btn btn-primary" type="submit">
                {messages.contact.send}{' '}
                <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
              </button>
            </div>
            <div aria-live="polite">
              {sent ? (
                <div className="sent">
                  <Check aria-hidden="true" size={14} strokeWidth={2.6} /> {messages.contact.sent}
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
