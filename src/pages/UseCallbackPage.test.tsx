import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import UseCallbackPage from './UseCallbackPage';
import UseCallbackDemo from '../components/08-useCallback/UseCallbackDemoFixed'; // Note: UseCallbackDemoFixed is imported as UseCallbackDemo

// Mock the UseCallbackDemoFixed component
vi.mock('../components/08-useCallback/UseCallbackDemoFixed', () => ({
  default: vi.fn(() => (
    <div data-testid="mock-usecallback-demo">
      Mock UseCallbackDemo Component
    </div>
  )),
}));

describe('UseCallbackPage', () => {
  it('renders the page title and description', () => {
    render(<UseCallbackPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /8. useCallback Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/`useCallback` memoizes a function definition./i),
    ).toBeInTheDocument();
  });

  it('renders the UseCallbackDemo component', () => {
    render(<UseCallbackPage />);
    expect(screen.getByTestId('mock-usecallback-demo')).toBeInTheDocument();
    expect(UseCallbackDemo).toHaveBeenCalled(); // Ensure the mock was called
  });
});
