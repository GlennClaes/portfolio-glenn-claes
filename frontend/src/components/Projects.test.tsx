import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Projects } from '@/components/Projects';
import { getProjects } from '@/data/projects';
import { LanguageProvider } from '@/i18n/LanguageProvider';

describe('Projects', () => {
  it('renders the selected work cards and opens a project', () => {
    const onOpen = vi.fn();
    render(
      <LanguageProvider>
        <Projects onOpen={onOpen} />
      </LanguageProvider>,
    );

    expect(screen.getByText('Glenn Claes Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Quality-First Delivery System')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /view case study: glenn claes portfolio/i }),
    );

    expect(onOpen).toHaveBeenCalledWith(getProjects('en')[0]);
  });
});
