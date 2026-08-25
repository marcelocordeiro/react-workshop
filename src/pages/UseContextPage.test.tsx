import { render, screen } from '@testing-library/react';
import UseContextPage from './UseContextPage';
import { Outlet } from 'react-router-dom';

// Partially mock react-router-dom: keep everything real, replace only <Outlet />.
// `jest.requireActual` is the Jest equivalent of a "spy on the real module" —
// think of it as Mockito's `spy()` versus a full `mock()`.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(() => (
    <div data-testid="mock-outlet">Mock Outlet Component</div>
  )),
}));

describe('UseContextPage', () => {
  it('renders the page title and description', () => {
    render(<UseContextPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /5. useContext Hook/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The `useContext` hook allows you to share state across your component tree/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the Outlet component', () => {
    render(<UseContextPage />);
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(Outlet).toHaveBeenCalled(); // Ensure the mock was called
  });
});
