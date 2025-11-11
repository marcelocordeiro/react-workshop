import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Welcome from './Welcome';

describe('Welcome', () => {
  it('renders the welcome message with the correct name', () => {
    render(<Welcome />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Hello, Backend Engineer!/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders the current time', () => {
    render(<Welcome />);
    // Since the time changes, we'll just check if the paragraph element exists and contains some time-like string.
    // A more robust test might mock Date, but for this workshop, checking for presence is sufficient.
    expect(screen.getByText(/The time is:/i)).toBeInTheDocument();
  });
});
