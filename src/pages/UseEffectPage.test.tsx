import { render, screen } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import UseEffectPage from './UseEffectPage';
import UserList from '../components/04-useEffect/UserList';

// Mock the UserList component
vi.mock('../components/04-useEffect/UserList', () => ({
  default: vi.fn(() => (
    <div data-testid="mock-userlist">Mock UserList Component</div>
  )),
}));

describe('UseEffectPage', () => {
  it('renders the page title and description', () => {
    render(<UseEffectPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /4. useEffect Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The `useEffect` hook lets you perform side effects, like fetching data./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the UserList component', () => {
    render(<UseEffectPage />);
    expect(screen.getByTestId('mock-userlist')).toBeInTheDocument();
    expect(UserList).toHaveBeenCalled(); // Ensure the mock was called
  });
});
