import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import SimpleContextPage from './SimpleContextPage';
import { SimpleContextExample } from '../components/05-useContext/SimpleContextExample';

// Mock the ContextExample component
vi.mock('../components/05-useContext/SimpleContextExample', () => ({
  SimpleContextExample: vi.fn(() => (
    <div data-testid="mock-context-example">Mock Simple Context Example</div>
  )),
}));

describe('SimpleContextPage', () => {
  it('renders the page title and description', () => {
    render(<SimpleContextPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /5.1 Simple useContext Example/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /This is a simpler example demonstrating how `useContext` works./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the ContextExample component', () => {
    render(<SimpleContextPage />);
    expect(screen.getByTestId('mock-context-example')).toBeInTheDocument();
    expect(SimpleContextExample).toHaveBeenCalled(); // Ensure the mock was called
  });
});
