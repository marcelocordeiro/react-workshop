import { render, screen } from '@testing-library/react';
import I18nPage from './I18nPage';
import I18nDemo from '../components/17-i18n/I18nDemo';

jest.mock('../components/17-i18n/I18nDemo', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-i18n-demo" />),
}));

describe('I18nPage', () => {
  it('renders the title and the demo', () => {
    render(<I18nPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /17. Internationalisation/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-i18n-demo')).toBeInTheDocument();
    expect(I18nDemo).toHaveBeenCalled();
  });
});
