'use client';

import { BrainCircuit, Check, Code2, Workflow } from 'lucide-react';
import type { ReactNode } from 'react';

import { useLanguage } from '@/i18n/LanguageProvider';

const icons: ReactNode[] = [
  <Code2 aria-hidden="true" size={26} strokeWidth={1.8} key="code" />,
  <BrainCircuit aria-hidden="true" size={26} strokeWidth={1.8} key="brain" />,
  <Workflow aria-hidden="true" size={26} strokeWidth={1.8} key="workflow" />,
];

export function Services() {
  const { messages } = useLanguage();

  return (
    <section id="services" className="section band">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <span className="eyebrow">{messages.services.eyebrow}</span>
            <h2 className="h-section">{messages.services.heading}</h2>
          </div>
          <p className="lead reveal" data-delay="1">
            {messages.services.lead}
          </p>
        </div>
        <div className="services-grid">
          {messages.services.items.map((service, index) => (
            <div
              key={service.title}
              className="card card-hover service-card reveal"
              data-delay={index + 1}
            >
              <div className="service-icon">{icons[index]}</div>
              <h3 className="h-card">{service.title}</h3>
              <p>{service.body}</p>
              <div className="service-benefit">
                <Check aria-hidden="true" size={14} strokeWidth={2.6} />
                <span>{service.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
