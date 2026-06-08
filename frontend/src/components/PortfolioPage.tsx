'use client';

import { useState } from 'react';

import { About } from '@/components/About';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Nav } from '@/components/Nav';
import { Process } from '@/components/Process';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { TechStrip } from '@/components/TechStrip';
import type { Project } from '@/data/projects';
import { useReveal } from '@/hooks/useReveal';

export function PortfolioPage() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechStrip />
        <About />
        <Services />
        <Projects onOpen={setOpenProject} />
        <Process />
        <Contact />
      </main>
      <Footer />
      <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  );
}
