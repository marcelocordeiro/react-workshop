import { render, screen } from '@testing-library/react';

import UseReducerPage from './UseReducerPage';
import Todo from '../components/07-useReducer/Todo';

// Mock the Todo component
jest.mock('../components/07-useReducer/Todo', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-todo">Mock Todo Component</div>
  )),
}));

describe('UseReducerPage', () => {
  it('renders the page title and description', () => {
    render(<UseReducerPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /7. useReducer Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /`useReducer` is an alternative to `useState` for managing more complex state logic./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the Todo component', () => {
    render(<UseReducerPage />);
    expect(screen.getByTestId('mock-todo')).toBeInTheDocument();
    expect(Todo).toHaveBeenCalled(); // Ensure the mock was called
  });
});
