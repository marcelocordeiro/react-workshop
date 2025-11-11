import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest'; // Vitest's globals
import Counter from './Counter'; // Import the component to test

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    // Use screen.getByText to find the element containing "Count is 0"
    expect(screen.getByText(/Count is 0/i)).toBeInTheDocument();
  });

  it('increments the count when "+" button is clicked', async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: '+' });
    await userEvent.click(incrementButton);
    expect(screen.getByText(/Count is 1/i)).toBeInTheDocument();
  });

  it('decrements the count when "-" button is clicked', async () => {
    render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: '-' });
    await userEvent.click(decrementButton);
    expect(screen.getByText(/Count is -1/i)).toBeInTheDocument();
  });
});
