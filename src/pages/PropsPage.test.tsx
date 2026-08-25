import { render, screen } from '@testing-library/react';

import PropsPage from './PropsPage';
import Greeting from '../components/03-Props/Greeting';

// Mock the Greeting component
jest.mock('../components/03-Props/Greeting', () => ({
  __esModule: true,
  default: jest.fn(({ name, children }) => (
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
      screen.getByRole('heading', { level: 1, name: /3. Props/i }),
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

    // First Greeting: the name came from a variable.
    expect(Greeting).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Ada' }),
      {},
    );
    expect(
      screen.getByText('This is a message passed as a child.'),
    ).toBeInTheDocument();

    // Second Greeting: the name was a literal in the JSX.
    expect(Greeting).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Grace' }),
      {},
    );
    expect(
      screen.getByRole('button', { name: /Click me!/i }),
    ).toBeInTheDocument();
  });
});
