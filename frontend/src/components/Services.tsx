import { Check, Code2, Gauge, Workflow } from 'lucide-react';
import type { ReactNode } from 'react';

interface Service {
  icon: ReactNode;
  title: string;
  body: string;
  benefit: string;
}

const services: Service[] = [
  {
    icon: <Code2 aria-hidden="true" size={26} strokeWidth={1.8} />,
    title: 'Web Development',
    body: 'Modern websites and portfolio experiences built with Next.js, TypeScript and responsive UI patterns.',
    benefit: 'A fast, polished website that is easy to maintain and ready to deploy.',
  },
  {
    icon: <Gauge aria-hidden="true" size={26} strokeWidth={1.8} />,
    title: 'App Interfaces',
    body: 'Focused frontends for dashboards, tools and small products where speed, clarity and usability matter.',
    benefit: 'Screens that feel calm, readable and practical in daily use.',
  },
  {
    icon: <Workflow aria-hidden="true" size={26} strokeWidth={1.8} />,
    title: 'Automation & Delivery',
    body: 'Small automations, CI checks, deployment setup and code quality workflows that keep projects moving.',
    benefit: 'Less manual work, fewer surprises and a cleaner path from commit to production.',
  },
];

export function Services() {
  return (
    <section id="services" className="section band">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <span className="eyebrow">What I do</span>
            <h2 className="h-section">Three ways I can help.</h2>
          </div>
          <p className="lead reveal" data-delay="1">
            Pick the one that fits, or combine them. Most projects start with a short call so we can
            scope the work honestly.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card card-hover service-card reveal"
              data-delay={index + 1}
            >
              <div className="service-icon">{service.icon}</div>
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
