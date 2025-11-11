import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import UseMemoPage from './UseMemoPage';
import UseMemoDemo from '../components/07-useMemo/UseMemoDemo';

// Mock the UseMemoDemo component
vi.mock('../components/07-useMemo/UseMemoDemo', () => ({
  default: vi.fn(() => (
    <div data-testid="mock-usememo-demo">Mock UseMemoDemo Component</div>
  )),
}));

describe('UseMemoPage', () => {
  it('renders the page title and description', () => {
    render(<UseMemoPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /7. useMemo Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/`useMemo` is used to memoize a calculated value./i),
    ).toBeInTheDocument();
  });

  it('renders the UseMemoDemo component', () => {
    render(<UseMemoPage />);
    expect(screen.getByTestId('mock-usememo-demo')).toBeInTheDocument();
    expect(UseMemoDemo).toHaveBeenCalled(); // Ensure the mock was called
  });
});
