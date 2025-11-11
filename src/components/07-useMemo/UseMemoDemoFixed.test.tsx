import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import UseMemoDemo from './UseMemoDemoFixed';

describe('UseMemoDemoFixed', () => {
  it('renders with initial count and selected item', () => {
    render(<UseMemoDemo />);
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
    // The last item in the array is selected, which is ARRAY_SIZE - 1
    expect(screen.getByText(/Selected Item: 29999998/i)).toBeInTheDocument();
  });

  it('increments the count when the Increment button is clicked', async () => {
    render(<UseMemoDemo />);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });

    await userEvent.click(incrementButton);
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    await userEvent.click(incrementButton);
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
  });
});
