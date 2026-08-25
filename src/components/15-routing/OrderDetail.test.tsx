import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OrderDetail from './OrderDetail';

// To exercise `useParams` we must declare the route pattern, not just the
// component — the param name comes from the route, not from a prop.
const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/routing/orders/:orderId" element={<OrderDetail />} />
      </Routes>
    </MemoryRouter>,
  );

describe('OrderDetail', () => {
  it('renders the order matching the URL parameter', () => {
    renderAt('/routing/orders/1002');

    expect(
      screen.getByRole('heading', { name: /Order #1002/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Customer: Grace/)).toBeInTheDocument();
  });

  it('handles an id that does not exist', () => {
    renderAt('/routing/orders/9999');

    expect(screen.getByRole('alert')).toHaveTextContent(
      /No order found for id/i,
    );
  });
});
