import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import UseReducerPage from './UseReducerPage';
import Todo from '../components/06-useReducer/Todo';

// Mock the Todo component
vi.mock('../components/06-useReducer/Todo', () => ({
  default: vi.fn(() => <div data-testid="mock-todo">Mock Todo Component</div>),
}));

describe('UseReducerPage', () => {
  it('renders the page title and description', () => {
    render(<UseReducerPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /6. useReducer Hook/i }),
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
