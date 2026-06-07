'use client';

import { ArrowRight, Check, Clock3, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { ContactPreset } from '@/lib/navigation';

export const CONTACT_EMAIL = 'contact@benbaeyens.com';

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
  type: 'Unity game',
  message: '',
};

export function Contact() {
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
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.includes('@')) nextErrors.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 8) {
      nextErrors.message = 'Please add a short message.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `[${form.type}] enquiry from ${form.name}`;
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
            <span className="eyebrow">Get in touch</span>
            <h2 className="h-section">Let&apos;s talk about your&nbsp;idea.</h2>
          </div>
          <p className="lead reveal" data-delay="1">
            Have a Unity idea, app, game, or lesson request? Send me a message and I&apos;ll get
            back to you — usually within a day.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card reveal">
            <span className="eyebrow">Direct</span>
            <h3 className="h-card mt-14">Prefer to skip the&nbsp;form?</h3>
            <p className="body-mute mt-10">
              All channels reach me directly. The form is just the easiest&nbsp;path.
            </p>
            <Link
              className="contact-channel contact-channel-link"
              href="mailto:contact@benbaeyens.com?subject=Quick%20hello"
            >
              <div className="ic">
                <Mail aria-hidden="true" size={18} strokeWidth={1.8} />
              </div>
              <div>
                <b>contact@benbaeyens.com</b>
                <span>Email me anytime</span>
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
                <b>Belgium · Remote</b>
                <span>Working across European time zones</span>
              </div>
            </Link>
            <div className="contact-channel">
              <div className="ic">
                <Clock3 aria-hidden="true" size={18} strokeWidth={1.8} />
              </div>
              <div>
                <b>Within 24 hours</b>
                <span>Typical response time on weekdays</span>
              </div>
            </div>
          </div>

          <form className="card reveal contact-form" data-delay="1" onSubmit={submit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name ? (
                  <span id="name-error" className="field-error">
                    {errors.name}
                  </span>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <span id="email-error" className="field-error">
                    {errors.email}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="field mt-16">
              <label htmlFor="type">Project type</label>
              <select id="type" value={form.type} onChange={update('type')}>
                <option>Unity game</option>
                <option>Unity app</option>
                <option>Unity lessons</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field mt-16">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                ref={messageRef}
                placeholder="Tell me a bit about what you have in mind…"
                value={form.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <span id="message-error" className="field-error">
                  {errors.message}
                </span>
              ) : null}
            </div>
            <div className="form-bottom">
              <span>No spam, ever. Just a reply from me.</span>
              <button className="btn btn-primary" type="submit">
                Send message <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
              </button>
            </div>
            <div aria-live="polite">
              {sent ? (
                <div className="sent">
                  <Check aria-hidden="true" size={14} strokeWidth={2.6} /> Your mail app should be
                  opening — just hit send and it&apos;ll land in my inbox.
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
