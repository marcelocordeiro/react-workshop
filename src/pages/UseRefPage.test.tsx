import { render, screen } from '@testing-library/react';
import UseRefPage from './UseRefPage';
import UseRefDemo from '../components/12-useRef/UseRefDemo';

jest.mock('../components/12-useRef/UseRefDemo', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-useref-demo" />),
}));

describe('UseRefPage', () => {
  it('renders the title and the demo', () => {
    render(<UseRefPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: /12. useRef Hook/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-useref-demo')).toBeInTheDocument();
    expect(UseRefDemo).toHaveBeenCalled();
  });
});
