import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Nav } from '@/components/Nav';
import { LanguageProvider } from '@/i18n/LanguageProvider';

const renderNav = () =>
  render(
    <LanguageProvider>
      <Nav />
    </LanguageProvider>,
  );

describe('Nav mobile menu', () => {
  it('opens and closes the mobile menu via the hamburger toggle', () => {
    renderNav();

    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile navigation/i)).toBeInTheDocument();

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu when a navigation link is chosen', () => {
    renderNav();

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const mobileNav = screen.getByLabelText(/mobile navigation/i);
    expect(mobileNav).toBeInTheDocument();

    fireEvent.click(within(mobileNav).getByRole('link', { name: /projects/i }));

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
