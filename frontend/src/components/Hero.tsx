'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { useLanguage } from '@/i18n/LanguageProvider';
import { initHeroScene } from '@/lib/hero-scene';
import { jumpTo } from '@/lib/navigation';

const ACCENT = '#1D4ED8';

export function Hero() {
  const { messages } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = initHeroScene(canvas, {
      variant: 'primitives',
      accent: ACCENT,
    });

    return () => scene?.dispose();
  }, []);

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-badge reveal">
            <span className="dot" />
            {messages.hero.badge}
          </div>
          <h1 className="h-display reveal" data-delay="1">
            {messages.hero.headingIntro}
            <span className="italic-serif">{messages.hero.headingName}</span>
            {messages.hero.headingOutro}
          </h1>
          <p className="lead hero-lead reveal" data-delay="2">
            {messages.hero.lead}
          </p>
          <div className="hero-ctas reveal" data-delay="3">
            <Link href="#contact" className="btn btn-primary" onClick={jumpTo('contact')}>
              {messages.hero.ctaContact}{' '}
              <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
            </Link>
            <Link href="#projects" className="btn btn-secondary" onClick={jumpTo('projects')}>
              {messages.hero.ctaProjects}
            </Link>
          </div>
          <div className="hero-meta reveal" data-delay="4">
            <div>
              <b>{messages.hero.metaFrontendLabel}</b> {messages.hero.metaFrontendValue}
            </div>
            <div>
              <b>{messages.hero.metaLocationLabel}</b> - {messages.hero.metaLocationValue}
            </div>
            <div>
              <b>{messages.hero.metaDeliveryLabel}</b> {messages.hero.metaDeliveryValue}
            </div>
          </div>
        </div>
        <div className="reveal" data-delay="2">
          <div className="scene-wrap">
            <canvas
              ref={canvasRef}
              className="scene-canvas"
              role="img"
              aria-label="Interactive low-poly 3D developer scene"
            />
            <div className="scene-tag tl">
              <span className="swatch" style={{ background: ACCENT }} />
              {messages.hero.sceneHint}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
