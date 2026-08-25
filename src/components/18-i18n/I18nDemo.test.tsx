import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import I18nDemo from './I18nDemo';
import { i18n } from './i18n';

// The i18n instance is module-level state, so reset the language between
// tests — same reasoning as resetting the Zustand store in chapter 16.
beforeEach(async () => {
  await i18n.changeLanguage('en');
});

describe('I18nDemo', () => {
  it('renders the English translations by default', () => {
    render(<I18nDemo />);

    expect(screen.getByText('Delivery status')).toBeInTheDocument();
    expect(screen.getByText('Hello, Ada!')).toBeInTheDocument();
  });

  it('interpolates and pluralises', async () => {
    render(<I18nDemo />);

    expect(screen.getByText('You have 1 order.')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /4 orders/i }));

    expect(screen.getByText('You have 4 orders.')).toBeInTheDocument();
  });

  it('switches language', async () => {
    render(<I18nDemo />);

    await i18n.changeLanguage('de');

    expect(await screen.findByText('Lieferstatus')).toBeInTheDocument();
    expect(screen.getByText('Hallo, Ada!')).toBeInTheDocument();
  });

  it('falls back to the fallback language for a missing key', async () => {
    render(<I18nDemo />);

    await i18n.changeLanguage('pt');

    // Present in pt.
    expect(await screen.findByText('Estado da entrega')).toBeInTheDocument();
    // Missing in pt -> English, and crucially NOT the raw key.
    expect(screen.getByLabelText('Language')).toBeInTheDocument();
    expect(screen.queryByText('demo.switch')).not.toBeInTheDocument();
  });
});
