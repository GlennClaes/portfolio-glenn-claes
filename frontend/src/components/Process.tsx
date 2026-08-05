'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/i18n/LanguageProvider';
import { openContact } from '@/lib/navigation';

export function Process() {
  const { messages } = useLanguage();

  return (
    <section id="process" className="section band">
      <div className="container">
        <div className="process-wrap reveal">
          <div>
            <span className="eyebrow">{messages.process.eyebrow}</span>
            <h2 className="h-section mt-14">{messages.process.heading}</h2>
            <p className="lead mt-18 max-520">{messages.process.lead}</p>
            <ul className="check-list">
              {messages.process.checks.map((item) => (
                <li key={item}>
                  <span className="check">
                    <Check aria-hidden="true" size={14} strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="process-actions">
              <Link
                href="#contact"
                className="btn btn-primary"
                onClick={openContact({
                  type: 'Website',
                  message: messages.process.ctaStartMessage,
                  focus: 'message',
                })}
              >
                {messages.process.ctaStart}{' '}
                <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
              </Link>
              <Link
                href="#contact"
                className="btn btn-ghost"
                onClick={openContact({
                  type: 'Website',
                  message: messages.process.ctaAskMessage,
                  focus: 'message',
                })}
              >
                {messages.process.ctaAsk}
              </Link>
            </div>
          </div>
          <div className="process-visual">
            <div className="process-chip chip-top">
              <span className="dot" /> {messages.process.code.chipTop}
            </div>
            <div className="code-card code-card-offset" aria-label={messages.process.code.ariaLabel}>
              <span className="c-com">// {messages.process.code.comment}</span>
              <br />
              <span className="c-key">const</span> checks = [
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;lint&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;typecheck&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;tests&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;build&quot;</span>,
              <br />
              ];
              <br />
              checks.<span className="c-fn">forEach</span>(ship);
            </div>
            <div className="process-chip chip-bottom">{messages.process.code.chipBottom}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
