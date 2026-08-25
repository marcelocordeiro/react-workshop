import { render, screen } from '@testing-library/react';

import UseMemoPage from './UseMemoPage';
import UseMemoDemo from '../components/08-useMemo/UseMemoDemo';

// Mock the UseMemoDemo component
jest.mock('../components/08-useMemo/UseMemoDemo', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-usememo-demo">Mock UseMemoDemo Component</div>
  )),
}));

describe('UseMemoPage', () => {
  it('renders the page title and description', () => {
    render(<UseMemoPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /8. useMemo Hook/i }),
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
