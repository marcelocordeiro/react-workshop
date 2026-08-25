import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UseRefDemo from './UseRefDemo';

describe('UseRefDemo', () => {
  it('focuses the input when the button is clicked', async () => {
    render(<UseRefDemo />);

    const input = screen.getByLabelText(/Search/i);
    expect(input).not.toHaveFocus();

    await userEvent.click(
      screen.getByRole('button', { name: /Focus the input/i }),
    );

    expect(input).toHaveFocus();
  });

  it('counts seconds while running and stops on demand', async () => {
    jest.useFakeTimers();
    // userEvent schedules its own timers, so it needs to know we faked them.
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<UseRefDemo />);

    await user.click(screen.getByRole('button', { name: /Start/i }));

    // Wrap timer advances in `act` so React flushes the resulting renders.
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/Elapsed: 2s/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Stop/i }));

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText(/Elapsed: 2s/)).toBeInTheDocument();

    jest.useRealTimers();
  });
});
