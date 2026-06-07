import { Check, Gamepad2, GraduationCap, Smartphone } from 'lucide-react';
import type { ReactNode } from 'react';

interface Service {
  icon: ReactNode;
  title: string;
  body: string;
  benefit: string;
}

const services: Service[] = [
  {
    icon: <Gamepad2 aria-hidden="true" size={26} strokeWidth={1.8} />,
    title: 'Unity Game Development',
    body: 'From prototypes to polished releases — gameplay systems, UI, performance, and the small details that make a game feel good to play.',
    benefit: 'A game that feels great on day one and stays maintainable on day 365.',
  },
  {
    icon: <Smartphone aria-hidden="true" size={26} strokeWidth={1.8} />,
    title: 'Unity App Development',
    body: 'Interactive apps and tools built in Unity: training simulations, AR/VR experiences, industrial visualisations, and cross-platform mobile builds.',
    benefit: 'One codebase, multiple platforms, a polished end-user experience.',
  },
  {
    icon: <GraduationCap aria-hidden="true" size={26} strokeWidth={1.8} />,
    title: 'Unity Lessons & Coaching',
    body: '1-on-1 or small-group lessons for beginners, students, and self-learners. We work on real projects, not abstract tutorials.',
    benefit: 'You leave each session with something working, and the confidence to keep going.',
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
            Pick the one that fits — or combine them. Most projects start with a short call so we
            can scope things honestly.
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
