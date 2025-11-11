import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UseContextPage from './UseContextPage';
import { Outlet } from 'react-router-dom';

// Mock the Outlet component from react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    Outlet: vi.fn(() => (
      <div data-testid="mock-outlet">Mock Outlet Component</div>
    )),
  };
});

describe('UseContextPage', () => {
  it('renders the page title and description', () => {
    render(<UseContextPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /5. useContext Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The `useContext` hook allows you to share state across your component tree/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the Outlet component', () => {
    render(<UseContextPage />);
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(Outlet).toHaveBeenCalled(); // Ensure the mock was called
  });
});
