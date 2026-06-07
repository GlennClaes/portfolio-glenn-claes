'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { openContact } from '@/lib/navigation';

export function Lessons() {
  return (
    <section id="lessons" className="section band">
      <div className="container">
        <div className="lessons-wrap reveal">
          <div>
            <span className="eyebrow">Unity lessons</span>
            <h2 className="h-section mt-14">Learn Unity by actually making something.</h2>
            <p className="lead mt-18 max-520">
              I teach the way I wish someone had taught me: hands-on, with real projects, real bugs,
              and real fixes. We focus on understanding why things work, not memorising syntax.
            </p>
            <ul className="lesson-list">
              {[
                'For absolute beginners — no coding background needed',
                'For students who want to go deeper than school covers',
                'For people building their first game or app',
                'Practical, hands-on teaching style — we ship things',
                'Focus on understanding, not memorising',
              ].map((item) => (
                <li key={item}>
                  <span className="check">
                    <Check aria-hidden="true" size={14} strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="lesson-actions">
              <Link
                href="#contact"
                className="btn btn-primary"
                onClick={openContact({
                  type: 'Unity lessons',
                  message:
                    "Hi Ben — I'd like to book a free 20-minute intro call about Unity lessons. A bit about me: ",
                  focus: 'message',
                })}
              >
                Book a free intro call{' '}
                <ArrowRight className="btn-arrow" aria-hidden="true" size={16} />
              </Link>
              <Link
                href="#contact"
                className="btn btn-ghost"
                onClick={openContact({
                  type: 'Unity lessons',
                  message: 'Hi Ben — quick question about your Unity lessons: ',
                  focus: 'message',
                })}
              >
                Ask a question
              </Link>
            </div>
          </div>
          <div className="lessons-visual">
            <div className="lesson-chip chip-top">
              <span className="dot" /> Lesson 03 · Player Movement
            </div>
            <div className="code-card code-card-offset" aria-label="Example Unity C sharp code">
              <span className="c-com">// Move the player with input</span>
              <br />
              <span className="c-key">void</span> <span className="c-fn">Update</span>() {'{'}
              <br />
              &nbsp;&nbsp;<span className="c-key">float</span> h = Input.
              <span className="c-fn">GetAxis</span>(
              <span className="c-str">&quot;Horizontal&quot;</span>);
              <br />
              &nbsp;&nbsp;<span className="c-key">float</span> v = Input.
              <span className="c-fn">GetAxis</span>(
              <span className="c-str">&quot;Vertical&quot;</span>);
              <br />
              &nbsp;&nbsp;Vector3 dir = <span className="c-key">new</span> Vector3(h, 0, v);
              <br />
              &nbsp;&nbsp;transform.<span className="c-fn">Translate</span>(dir * speed *
              Time.deltaTime);
              <br />
              {'}'}
            </div>
            <div className="lesson-chip chip-bottom">45 min · 1-on-1</div>
          </div>
        </div>
      </div>
    </section>
  );
}
