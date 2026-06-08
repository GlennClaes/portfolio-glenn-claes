'use client';

import Link from 'next/link';

import { BrandLogo } from '@/components/BrandLogo';
import { jumpTo, openContact } from '@/lib/navigation';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4 4h4v4H4zM4 10h4v10H4zM10 10h3.7v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V20h-4v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.5V20h-4z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0 1 12 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="container">
        <div className="foot-grid">
          <div>
            <BrandLogo footer />
            <p className="foot-tag">
              Developer focused on clean websites, practical interfaces and reliable delivery.
            </p>
          </div>
          <div>
            <h2>Navigate</h2>
            <Link href="#about" onClick={jumpTo('about')}>
              About
            </Link>
            <Link href="#services" onClick={jumpTo('services')}>
              Services
            </Link>
            <Link href="#projects" onClick={jumpTo('projects')}>
              Projects
            </Link>
            <Link href="#process" onClick={jumpTo('process')}>
              Process
            </Link>
          </div>
          <div>
            <h2>Contact</h2>
            <Link href="mailto:contact@glennclaes.be?subject=Quick%20hello">
              contact@glennclaes.be
            </Link>
            <Link
              href="#contact"
              onClick={openContact({
                type: 'Website',
                message: "Hi Glenn - I'd like to discuss a project. Here's the short version: ",
                focus: 'message',
              })}
            >
              Project enquiry
            </Link>
            <Link
              href="#contact"
              onClick={openContact({
                type: 'Automation',
                message: "Hi Glenn - I'd like to talk about automation. A bit about what I need: ",
                focus: 'message',
              })}
            >
              Automation enquiry
            </Link>
          </div>
          <div>
            <h2>Elsewhere</h2>
            <Link
              href="https://www.linkedin.com/in/glenn-claes/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <LinkedInIcon /> LinkedIn
            </Link>
            <Link
              href="https://github.com/GlennClaes"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <GitHubIcon /> GitHub
            </Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>(c) 2026 Glenn Claes. All rights reserved.</span>
          <span>Belgium - Available worldwide</span>
        </div>
      </div>
    </footer>
  );
}
