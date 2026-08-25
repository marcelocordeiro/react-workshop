import { render, screen } from '@testing-library/react';

import UseEffectPage from './UseEffectPage';
import UserList from '../components/05-useEffect/UserList';

// Mock the UserList component
jest.mock('../components/05-useEffect/UserList', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-userlist">Mock UserList Component</div>
  )),
}));

describe('UseEffectPage', () => {
  it('renders the page title and description', () => {
    render(<UseEffectPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /5. useEffect Hook/i }),
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
