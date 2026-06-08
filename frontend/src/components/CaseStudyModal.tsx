'use client';

import { ArrowRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';

import { ProjectThumb } from '@/components/ProjectThumb';
import type { Project } from '@/data/projects';
import { openContact } from '@/lib/navigation';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop">
      <button
        type="button"
        className="modal-scrim"
        onClick={onClose}
        aria-label="Close case study"
      />
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close">
          <X aria-hidden="true" size={18} strokeWidth={2.2} />
        </button>
        <div className={`modal-hero ${project.kind}`}>
          <ProjectThumb kind={project.kind} />
          <div className="modal-hero-meta">
            <span className="eyebrow modal-eyebrow">{project.label}</span>
            <h2 id={titleId} className="h-section modal-title">
              {project.title}
            </h2>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-facts">
            <div>
              <span className="k">Role</span>
              <span className="v">{project.role}</span>
            </div>
            <div>
              <span className="k">Client</span>
              <span className="v">{project.client}</span>
            </div>
            <div>
              <span className="k">Year</span>
              <span className="v">{project.year}</span>
            </div>
            <div>
              <span className="k">Platform</span>
              <span className="v">{project.platform}</span>
            </div>
          </div>

          {project.body.map((paragraph, index) => (
            <p key={paragraph} className={`lead${index === 0 ? '' : ' mt-14'}`}>
              {paragraph}
            </p>
          ))}

          <h3 className="modal-sub">What I worked on</h3>
          <ul className="check-list mt-14">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <span className="check">
                  <Check aria-hidden="true" size={14} strokeWidth={2.6} />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <h3 className="modal-sub">Stack</h3>
          <div className="tags mt-10">
            {project.stack.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>

          <p className="modal-credits">{project.credits}</p>

          <div className="modal-actions">
            <Link
              className="btn btn-primary"
              href={project.cta.href}
              target={project.cta.href.startsWith('http') ? '_blank' : undefined}
              rel={project.cta.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {project.cta.label} <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
            </Link>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                onClose();
                window.setTimeout(() => {
                  openContact({
                    type: project.kind === 'app' ? 'Automation' : 'Website',
                    message: `Hi Glenn - I'd like to get in touch about "${project.title}". A bit about what I have in mind: `,
                    focus: 'message',
                  })();
                }, 80);
              }}
            >
              Get in touch about this
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
