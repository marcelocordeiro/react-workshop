import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import PropsPage from './PropsPage';
import Greeting from '../components/02-Props/Greeting';

// Mock the Greeting component
vi.mock('../components/02-Props/Greeting', () => ({
  default: vi.fn(({ name, children }) => (
    <div data-testid={`mock-greeting-${name}`}>
      Mock Greeting for {name}
      {children}
    </div>
  )),
}));

describe('PropsPage', () => {
  it('renders the page title and description', () => {
    render(<PropsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /2. Props/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Props \(short for properties\) are how you pass data from a parent component to a child component./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders two Greeting components with correct props', () => {
    render(<PropsPage />);
    expect(Greeting).toHaveBeenCalled();

    // Check first Greeting call
    expect(Greeting).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Marcelo' }),
      {},
    );
    expect(
      screen.getByText('This is a message passed as a child.'),
    ).toBeInTheDocument();

    // Check second Greeting call
    expect(Greeting).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Marcelo' }),
      {},
    );
    expect(
      screen.getByRole('button', { name: /Click me!/i }),
    ).toBeInTheDocument();
  });
});
