import { render, screen } from '@testing-library/react';
import CustomHooksPage from './CustomHooksPage';
import CustomHooksDemo from '../components/12-custom-hooks/CustomHooksDemo';

jest.mock('../components/12-custom-hooks/CustomHooksDemo', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-custom-hooks-demo" />),
}));

describe('CustomHooksPage', () => {
  it('renders the title and the demo', () => {
    render(<CustomHooksPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: /12. Custom Hooks/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-custom-hooks-demo')).toBeInTheDocument();
    expect(CustomHooksDemo).toHaveBeenCalled();
  });
});
