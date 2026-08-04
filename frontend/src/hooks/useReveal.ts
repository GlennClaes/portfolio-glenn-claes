'use client';

import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => el.classList.add('in'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    // Observe all elements that are already in the DOM.
    document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => revealObserver.observe(el));

    // Watch for new .reveal elements added later (e.g. after language swap or lazy render)
    // and observe them automatically.
    const domObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.classList.contains('reveal') && !node.classList.contains('in')) {
            revealObserver.observe(node);
          }
          node.querySelectorAll?.<HTMLElement>('.reveal:not(.in)').forEach((el) => revealObserver.observe(el));
        }
      }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      domObserver.disconnect();
    };
  }, []);
}
