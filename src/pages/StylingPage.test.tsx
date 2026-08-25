import { render, screen } from '@testing-library/react';
import StylingPage from './StylingPage';
import StylingDemo from '../components/14-styling/StylingDemo';

jest.mock('../components/14-styling/StylingDemo', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-styling-demo" />),
}));

describe('StylingPage', () => {
  it('renders the title and the demo', () => {
    render(<StylingPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: /14. Styling/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-styling-demo')).toBeInTheDocument();
    expect(StylingDemo).toHaveBeenCalled();
  });
});
