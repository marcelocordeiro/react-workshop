import { render, screen } from '@testing-library/react';
import ZustandPage from './ZustandPage';
import ZustandDemo from '../components/17-zustand/ZustandDemo';

jest.mock('../components/17-zustand/ZustandDemo', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-zustand-demo" />),
}));

describe('ZustandPage', () => {
  it('renders the title and the demo', () => {
    render(<ZustandPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /17. Global State with Zustand/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-zustand-demo')).toBeInTheDocument();
    expect(ZustandDemo).toHaveBeenCalled();
  });
});
