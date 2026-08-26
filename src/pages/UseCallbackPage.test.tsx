import { render, screen } from '@testing-library/react';

import UseCallbackPage from './UseCallbackPage';
import UseCallbackDemo from '../components/09-useCallback/UseCallbackDemo';

// Mock the UseCallbackDemo component
jest.mock('../components/09-useCallback/UseCallbackDemo', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-usecallback-demo">
      Mock UseCallbackDemo Component
    </div>
  )),
}));

describe('UseCallbackPage', () => {
  it('renders the page title and description', () => {
    render(<UseCallbackPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /9. useCallback Hook/i }),
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
