import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { server } from '../../test/mocks/server';
import { API_URL } from '../../test/mocks/handlers';
import UserList from './UserListWithReactQuery';

/**
 * The same component as UserListWithReactQuery.test.tsx, tested the other way.
 *
 *   That file:  jest.mock('axios')  -> replaces the HTTP client.
 *   This file:  MSW                 -> replaces the server.
 *
 * MSW tests exercise the real axios instance, the real interceptors and the
 * real React Query cache, so they catch wiring mistakes that a mocked client
 * hides. They are also the style used in most production codebases.
 */
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('UserListWithReactQuery (MSW)', () => {
  it('shows a spinner, then the data from the fake server', async () => {
    renderWithClient(<UserList />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders the error branch when the server fails', async () => {
    server.use(
      rest.get(API_URL, (_req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: 'boom' })),
      ),
    );

    renderWithClient(<UserList />);

    expect(await screen.findByRole('alert')).toHaveTextContent(/500/);
  });
});
