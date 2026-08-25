import { render, screen } from '@testing-library/react';
import UseStatePage from './UseStatePage';
import Counter from '../components/04-useState/Counter';

// Mock the Counter component
jest.mock('../components/04-useState/Counter', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-counter">Mock Counter Component</div>
  )),
}));

describe('UseStatePage', () => {
  it('renders the page title and description', () => {
    render(<UseStatePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /4. useState Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The `useState` hook lets you add a state variable to your component./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the Counter component', () => {
    render(<UseStatePage />);
    expect(screen.getByTestId('mock-counter')).toBeInTheDocument();
    expect(Counter).toHaveBeenCalled(); // Ensure the mock was called
  });
});
