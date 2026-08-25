import { render, screen } from '@testing-library/react';

import ThemeSwitcherPage from './ThemeSwitcherPage';
import ThemeSwitcher from '../components/06-useContext/ThemeSwitcher';

// Mock the ThemeSwitcher component
jest.mock('../components/06-useContext/ThemeSwitcher', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-theme-switcher">Mock ThemeSwitcher Component</div>
  )),
}));

describe('ThemeSwitcherPage', () => {
  it('renders the page title and description', () => {
    render(<ThemeSwitcherPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /6.2 Theme Switcher Example/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /`useContext` allows you to subscribe to a context and consume its value/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the ThemeSwitcher component', () => {
    render(<ThemeSwitcherPage />);
    expect(screen.getByTestId('mock-theme-switcher')).toBeInTheDocument();
    expect(ThemeSwitcher).toHaveBeenCalled(); // Ensure the mock was called
  });
});
