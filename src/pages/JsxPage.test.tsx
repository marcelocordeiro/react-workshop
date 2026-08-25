import { render, screen } from '@testing-library/react';
import JsxPage from './JsxPage';
import Welcome from '../components/01-JSX/Welcome';

// Mock the Welcome component
jest.mock('../components/01-JSX/Welcome', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-welcome">Mock Welcome Component</div>
  )),
}));

describe('JsxPage', () => {
  it('renders the page title and description', () => {
    render(<JsxPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /1. JSX/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /JSX is a syntax extension for JavaScript that looks like HTML./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the Welcome component', () => {
    render(<JsxPage />);
    expect(screen.getByTestId('mock-welcome')).toBeInTheDocument();
    expect(Welcome).toHaveBeenCalled(); // Ensure the mock was called
  });
});
