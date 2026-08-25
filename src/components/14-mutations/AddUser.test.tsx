import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rest } from 'msw';
import { server } from '../../test/mocks/server';
import { API_URL } from '../../test/mocks/handlers';
import AddUser from './AddUser';

// A fresh cache per test, otherwise one test's cached users leak into the next.
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('AddUser', () => {
  it('renders the users returned by the server', async () => {
    renderWithClient(<AddUser />);

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('grace@example.com')).toBeInTheDocument();
  });

  it('posts the new user and reports the id assigned by the server', async () => {
    renderWithClient(<AddUser />);
    await screen.findByText('Ada Lovelace');

    await userEvent.type(screen.getByLabelText(/Name/i), 'Alan Turing');
    await userEvent.type(screen.getByLabelText(/Email/i), 'alan@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Add user/i }));

    expect(await screen.findByText(/assigned id 11/i)).toBeInTheDocument();

    // onSuccess clears the form.
    await waitFor(() => expect(screen.getByLabelText(/Name/i)).toHaveValue(''));
  });

  it('surfaces a server failure', async () => {
    // Per-test override. setup.ts resets handlers afterwards, so this only
    // affects this test.
    server.use(
      rest.post(API_URL, (_req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: 'nope' })),
      ),
    );

    renderWithClient(<AddUser />);
    await screen.findByText('Ada Lovelace');

    await userEvent.type(screen.getByLabelText(/Name/i), 'Alan Turing');
    await userEvent.type(screen.getByLabelText(/Email/i), 'alan@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Add user/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/500/);
  });
});
