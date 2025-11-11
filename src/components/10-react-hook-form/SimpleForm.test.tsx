import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SimpleForm from './SimpleForm';

describe('SimpleForm', () => {
  // Mock window.alert as it's used in onSubmit
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    alertMock.mockClear();
  });

  it('renders the form fields and submit button', () => {
    render(<SimpleForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Subscribe to newsletter/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('displays validation errors for required fields on submit', async () => {
    render(<SimpleForm />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    expect(alertMock).not.toHaveBeenCalled();
  });

  it('displays validation error for invalid email format', async () => {
    render(<SimpleForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
    expect(alertMock).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(<SimpleForm />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const subscribeCheckbox = screen.getByLabelText(/Subscribe to newsletter/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');
    await userEvent.type(emailInput, 'john.doe@example.com');
    await userEvent.click(subscribeCheckbox); // Check the checkbox
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith(
        JSON.stringify(
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            subscribe: true,
          },
          null,
          2,
        ),
      );
    });
    expect(
      screen.queryByText('First name is required'),
    ).not.toBeInTheDocument();
  });

  it('checkbox state can be toggled', async () => {
    render(<SimpleForm />);
    const subscribeCheckbox = screen.getByLabelText(/Subscribe to newsletter/i);

    expect(subscribeCheckbox).not.toBeChecked();
    await userEvent.click(subscribeCheckbox);
    expect(subscribeCheckbox).toBeChecked();
    await userEvent.click(subscribeCheckbox);
    expect(subscribeCheckbox).not.toBeChecked();
  });
});
