import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { SimpleContextExample } from './SimpleContextExample';

describe('SimpleContextExample', () => {
  it('renders with initial state OFF', () => {
    render(<SimpleContextExample />);
    expect(screen.getByText(/Current State: OFF/i)).toBeInTheDocument();
  });

  it('toggles state to ON when button is clicked', async () => {
    render(<SimpleContextExample />);
    const toggleButton = screen.getByRole('button', { name: /Toggle State/i });
    await userEvent.click(toggleButton);
    expect(screen.getByText(/Current State: ON/i)).toBeInTheDocument();
  });

  it('toggles state back to OFF when button is clicked again', async () => {
    render(<SimpleContextExample />);
    const toggleButton = screen.getByRole('button', { name: /Toggle State/i });
    await userEvent.click(toggleButton); // ON
    await userEvent.click(toggleButton); // OFF
    expect(screen.getByText(/Current State: OFF/i)).toBeInTheDocument();
  });
});
