import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoutingPage from './RoutingPage';

// RoutingPage renders <Outlet />, so it only makes sense inside a route that
// actually has a child to render.
const renderWithChild = () =>
  render(
    <MemoryRouter initialEntries={['/routing']}>
      <Routes>
        <Route path="/routing" element={<RoutingPage />}>
          <Route index element={<div data-testid="child-route" />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe('RoutingPage', () => {
  it('renders the title and its navigation links', () => {
    renderWithChild();

    expect(
      screen.getByRole('heading', { level: 1, name: /16. Routing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Order list/i }),
    ).toBeInTheDocument();
  });

  it('renders the matched child route through the Outlet', () => {
    renderWithChild();

    expect(screen.getByTestId('child-route')).toBeInTheDocument();
  });
});
