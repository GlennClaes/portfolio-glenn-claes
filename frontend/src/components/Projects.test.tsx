import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Projects } from '@/components/Projects';
import { projects } from '@/data/projects';

describe('Projects', () => {
  it('renders the selected work cards and opens a project', () => {
    const onOpen = vi.fn();
    render(<Projects onOpen={onOpen} />);

    expect(screen.getByText('Glenn Claes Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Quality-First Delivery System')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /view case study for glenn claes portfolio/i }),
    );

    expect(onOpen).toHaveBeenCalledWith(projects[0]);
  });
});
