import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ZustandDemo from './ZustandDemo';
import { useCartStore } from './cartStore';

// The store lives outside React, so it survives between tests. Reset it,
// exactly as you would reset a singleton or truncate a table between tests.
beforeEach(() => {
  useCartStore.setState({ items: [] });
  localStorage.clear();
});

describe('ZustandDemo', () => {
  it('starts empty', () => {
    render(<ZustandDemo />);

    expect(screen.getByText(/Cart: 0 item\(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/The cart is empty/)).toBeInTheDocument();
  });

  it('shares state between sibling components with no props', async () => {
    render(<ZustandDemo />);

    await userEvent.click(
      screen.getByRole('button', { name: /Add Keyboard/i }),
    );
    await userEvent.click(screen.getByRole('button', { name: /Add Monitor/i }));

    // The badge and the list are separate components; neither received a prop.
    expect(screen.getByText(/Cart: 2 item\(s\)/)).toBeInTheDocument();
    expect(screen.getByText('Keyboard × 1')).toBeInTheDocument();
  });

  it('increments the quantity when the same item is added twice', async () => {
    render(<ZustandDemo />);

    await userEvent.click(
      screen.getByRole('button', { name: /Add Keyboard/i }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: /Add Keyboard/i }),
    );

    expect(screen.getByText('Keyboard × 2')).toBeInTheDocument();
    expect(screen.getByText(/Cart: 2 item\(s\)/)).toBeInTheDocument();
  });

  it('removes an item', async () => {
    render(<ZustandDemo />);

    await userEvent.click(screen.getByRole('button', { name: /Add Monitor/i }));
    await userEvent.click(
      screen.getByRole('button', { name: /remove Monitor/i }),
    );

    expect(screen.getByText(/The cart is empty/)).toBeInTheDocument();
  });

  it('can be driven from outside React', () => {
    // No component involved: the store is a plain object with an API.
    useCartStore.getState().add({ id: 'a', label: 'Keyboard' });

    render(<ZustandDemo />);

    expect(screen.getByText(/Cart: 1 item\(s\)/)).toBeInTheDocument();
  });
});
