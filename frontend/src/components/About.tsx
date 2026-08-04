'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

export function About() {
  const { messages } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="reveal">
            <div className="about-portrait">
              {/*<Image*/}
              {/*  src="/about-portrait.jpg"*/}
              {/*  alt="Glenn Claes"*/}
              {/*  fill*/}
              {/*  priority*/}
              {/*  sizes="(max-width: 900px) 100vw, 40vw"*/}
              {/*/>*/}
            </div>
            <div className="about-facts">
              {messages.about.facts.map((fact) => (
                <div className="fact" key={fact.lbl}>
                  <div className="num">{fact.num}</div>
                  <div className="lbl">{fact.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow reveal">{messages.about.eyebrow}</span>
            <h2 className="h-section reveal" data-delay="1">
              {messages.about.heading}
            </h2>
            <p className="lead reveal mt-22" data-delay="2">
              {messages.about.lead1}
            </p>
            <p className="lead reveal mt-14" data-delay="3">
              {messages.about.lead2}
            </p>
            <p className="lead reveal body-mute mt-14" data-delay="4">
              {messages.about.lead3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
