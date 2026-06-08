'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { initHeroScene } from '@/lib/hero-scene';
import { jumpTo } from '@/lib/navigation';

const ACCENT = '#1D4ED8';

export function Hero() {
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
            Available for freelance projects - 2026
          </div>
          <h1 className="h-display reveal" data-delay="1">
            Hi, I&apos;m <span className="italic-serif">Glenn</span>, a developer building clean
            digital products.
          </h1>
          <p className="lead hero-lead reveal" data-delay="2">
            I create fast websites, practical apps, polished interfaces, and reliable automation
            with a calm, detail-driven workflow.
          </p>
          <div className="hero-ctas reveal" data-delay="3">
            <Link href="#contact" className="btn btn-primary" onClick={jumpTo('contact')}>
              Contact me <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
            </Link>
            <Link href="#projects" className="btn btn-secondary" onClick={jumpTo('projects')}>
              View projects
            </Link>
          </div>
          <div className="hero-meta reveal" data-delay="4">
            <div>
              <b>Frontend</b> React, Next.js & TypeScript
            </div>
            <div>
              <b>Belgium</b> - Remote friendly
            </div>
            <div>
              <b>Delivery</b> clear, tested, deployable
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
              Move your cursor to interact
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
