'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import { openContact } from '@/lib/navigation';

export function Process() {
  return (
    <section id="process" className="section band">
      <div className="container">
        <div className="process-wrap reveal">
          <div>
            <span className="eyebrow">Process</span>
            <h2 className="h-section mt-14">Build the right thing, then make it shippable.</h2>
            <p className="lead mt-18 max-520">
              I keep projects clear and practical: align on the goal, design the flow, build the
              important pieces first, then verify the details before deployment.
            </p>
            <ul className="check-list">
              {[
                'Clear scope before implementation starts',
                'Responsive UI checked across desktop, tablet and mobile',
                'Strict TypeScript and focused component structure',
                'Automated quality checks for linting, tests and builds',
                'Deployment-ready output for Vercel and GitHub Pages',
              ].map((item) => (
                <li key={item}>
                  <span className="check">
                    <Check aria-hidden="true" size={14} strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="process-actions">
              <Link
                href="#contact"
                className="btn btn-primary"
                onClick={openContact({
                  type: 'Website',
                  message: "Hi Glenn - I'd like to discuss a project. Here's the short version: ",
                  focus: 'message',
                })}
              >
                Start a project <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
              </Link>
              <Link
                href="#contact"
                className="btn btn-ghost"
                onClick={openContact({
                  type: 'Website',
                  message: 'Hi Glenn - quick question about your work: ',
                  focus: 'message',
                })}
              >
                Ask a question
              </Link>
            </div>
          </div>
          <div className="process-visual">
            <div className="process-chip chip-top">
              <span className="dot" /> Sprint 03 - Deploy
            </div>
            <div className="code-card code-card-offset" aria-label="Example deployment checklist">
              <span className="c-com">// Quality gate</span>
              <br />
              <span className="c-key">const</span> checks = [
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;lint&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;typecheck&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;tests&quot;</span>,
              <br />
              &nbsp;&nbsp;<span className="c-str">&quot;build&quot;</span>,
              <br />
              ];
              <br />
              checks.<span className="c-fn">forEach</span>(ship);
            </div>
            <div className="process-chip chip-bottom">Vercel ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}
