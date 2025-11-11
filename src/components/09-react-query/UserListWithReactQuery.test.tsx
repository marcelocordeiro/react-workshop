import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './UserListWithReactQuery';

// Mock axios
vi.mock('axios');

// Create a QueryClient for each test to ensure isolation
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });

// Custom render function to wrap components with QueryClientProvider
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return {
    ...render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    ),
    queryClient,
  };
};

describe('UserListWithReactQuery', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockClear(); // Clear axios mock calls
  });

  it('displays loading spinner initially', () => {
    // Mock axios.get to return a pending promise to keep it in loading state
    vi.mocked(axios.get).mockReturnValueOnce(new Promise(() => {}));

    renderWithClient(<UserList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays user data after successful fetch', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockUsers });

    renderWithClient(<UserList />);

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
    const errorMessage = 'Network Error'; // react-query passes the error message directly
    vi.mocked(axios.get).mockRejectedValueOnce(new Error(errorMessage));

    renderWithClient(<UserList />);

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
