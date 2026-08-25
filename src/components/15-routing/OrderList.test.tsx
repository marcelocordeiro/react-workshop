import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OrderList from './OrderList';

// Any component that uses router hooks must be rendered inside a router.
// `MemoryRouter` keeps history in memory instead of the browser URL bar —
// it is the test double for the router.
const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <OrderList />
    </MemoryRouter>,
  );

describe('OrderList', () => {
  it('lists every order when no filter is present in the URL', () => {
    renderAt('/routing/orders');
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('reads the initial filter from the query string', () => {
    renderAt('/routing/orders?status=pending');

    expect(screen.getByText(/Order #1002/)).toBeInTheDocument();
    expect(screen.queryByText(/Order #1001/)).not.toBeInTheDocument();
  });

  it('filters when a toggle is clicked', async () => {
    renderAt('/routing/orders');

    await userEvent.click(screen.getByRole('button', { name: /Delivered/i }));

    expect(screen.getByText(/Order #1001/)).toBeInTheDocument();
    expect(screen.queryByText(/Order #1002/)).not.toBeInTheDocument();
  });
});
