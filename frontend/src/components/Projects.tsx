'use client';

import { ArrowRight } from 'lucide-react';
import type { KeyboardEvent } from 'react';

import { projects, type Project } from '@/data/projects';
import { ProjectThumb } from '@/components/ProjectThumb';

interface ProjectsProps {
  onOpen: (project: Project) => void;
}

export function Projects({ onOpen }: ProjectsProps) {
  const openWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, project: Project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(project);
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <span className="eyebrow">Selected work</span>
            <h2 className="h-section">A look at recent&nbsp;projects.</h2>
          </div>
          <p className="lead reveal" data-delay="1">
            Two snapshots of recent Unity work. Click through for the details, or drop a line if you
            want the long version.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className="project-card reveal"
              data-delay={index + 1}
              onClick={() => onOpen(project)}
              onKeyDown={(event) => openWithKeyboard(event, project)}
              aria-label={`View case study for ${project.title}`}
            >
              <span className={`project-thumb ${project.kind}`}>
                <ProjectThumb kind={project.kind} />
                <span className="placeholder-label">{project.label}</span>
              </span>
              <span className="project-body">
                <span className="h-card">{project.title}</span>
                <span className="project-desc">{project.desc}</span>
                <span className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="project-foot">
                  <span className="btn btn-secondary btn-sm">
                    View case study{' '}
                    <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
                  </span>
                  <span className="project-status">
                    {project.available ? 'Launching June 2026' : 'Under NDA'}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
