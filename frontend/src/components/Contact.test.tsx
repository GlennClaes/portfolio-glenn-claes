import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Contact } from '@/components/Contact';

describe('Contact', () => {
  it('shows accessible validation messages for required fields', () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Please add a short message.')).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('prefills the form from the open-contact event', () => {
    render(<Contact />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent('open-contact', {
          detail: {
            type: 'Automation',
            message: 'Hi Glenn - I would like to automate a workflow.',
          },
        }),
      );
    });

    expect(screen.getByLabelText(/project type/i)).toHaveValue('Automation');
    expect(screen.getByLabelText(/message/i)).toHaveValue(
      'Hi Glenn - I would like to automate a workflow.',
    );
  });
});
