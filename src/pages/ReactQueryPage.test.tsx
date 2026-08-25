import { render, screen } from '@testing-library/react';

import ReactQueryPage from './ReactQueryPage';
import UserListWithReactQuery from '../components/09-react-query/UserListWithReactQuery';

// Mock the UserListWithReactQuery component
jest.mock('../components/09-react-query/UserListWithReactQuery', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-userlist-react-query">
      Mock UserListWithReactQuery Component
    </div>
  )),
}));

describe('ReactQueryPage', () => {
  it('renders the page title and description', () => {
    render(<ReactQueryPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /9. React Query for Data Fetching/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /treats server data as a cache rather than as component/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the UserListWithReactQuery component', () => {
    render(<ReactQueryPage />);
    expect(screen.getByTestId('mock-userlist-react-query')).toBeInTheDocument();
    expect(UserListWithReactQuery).toHaveBeenCalled(); // Ensure the mock was called
  });
});
