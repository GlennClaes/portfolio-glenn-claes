'use client';

import { ArrowRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useId, useRef } from 'react';

import { ProjectThumb } from '@/components/ProjectThumb';
import type { Project } from '@/data/projects';
import { useLanguage } from '@/i18n/LanguageProvider';
import { openContact } from '@/lib/navigation';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { messages } = useLanguage();
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
        aria-label={messages.modal.closeCaseStudy}
      />
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button
          ref={closeRef}
          className="modal-close"
          onClick={onClose}
          aria-label={messages.modal.close}
        >
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
              <span className="k">{messages.modal.role}</span>
              <span className="v">{project.role}</span>
            </div>
            <div>
              <span className="k">{messages.modal.client}</span>
              <span className="v">{project.client}</span>
            </div>
            <div>
              <span className="k">{messages.modal.year}</span>
              <span className="v">{project.year}</span>
            </div>
            <div>
              <span className="k">{messages.modal.platform}</span>
              <span className="v">{project.platform}</span>
            </div>
          </div>

          {project.body.map((paragraph, index) => (
            <p key={paragraph} className={`lead${index === 0 ? '' : ' mt-14'}`}>
              {paragraph}
            </p>
          ))}

          <h3 className="modal-sub">{messages.modal.whatIWorkedOn}</h3>
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

          <h3 className="modal-sub">{messages.modal.stack}</h3>
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
                    message: messages.modal.getInTouchMessage(project.title),
                    focus: 'message',
                  })();
                }, 80);
              }}
            >
              {messages.modal.getInTouch}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
