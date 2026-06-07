import type { MouseEvent } from 'react';

export interface ContactPreset {
  type?: string;
  message?: string;
  name?: string;
  email?: string;
  focus?: 'message';
}

export function jumpTo(id: string) {
  return (event?: MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
}

export function openContact(preset: ContactPreset = {}) {
  return (event?: MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    window.dispatchEvent(new CustomEvent<ContactPreset>('open-contact', { detail: preset }));

    window.setTimeout(() => {
      const element = document.getElementById('contact');
      if (!element) return;

      const y = element.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 30);
  };
}
