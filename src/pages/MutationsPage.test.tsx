import { render, screen } from '@testing-library/react';
import MutationsPage from './MutationsPage';
import AddUser from '../components/14-mutations/AddUser';

jest.mock('../components/14-mutations/AddUser', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-add-user" />),
}));

describe('MutationsPage', () => {
  it('renders the title and the demo', () => {
    render(<MutationsPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /14. Mutations & Cache Invalidation/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-user')).toBeInTheDocument();
    expect(AddUser).toHaveBeenCalled();
  });
});
