import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import UserList from './UserList';

// Mock axios
vi.mock('axios');

describe('UserList', () => {
  it('displays loading spinner initially', () => {
    // Mock axios.get to return a pending promise to keep it in loading state
    vi.mocked(axios.get).mockReturnValueOnce(new Promise(() => {}));

    render(<UserList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays user data after successful fetch', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    // Wait for the loading spinner to disappear and content to appear
    await waitFor(() =>
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(),
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('displays error message on failed fetch', async () => {
    const errorMessage = 'Failed to fetch users: Error: Network Error';
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('Network Error'));

    render(<UserList />);

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
