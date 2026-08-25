import { render, screen } from '@testing-library/react';

import ReactHookFormPage from './ReactHookFormPage';
import SimpleForm from '../components/11-react-hook-form/SimpleForm';

// Mock the SimpleForm component
jest.mock('../components/11-react-hook-form/SimpleForm', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-simple-form">Mock SimpleForm Component</div>
  )),
}));

describe('ReactHookFormPage', () => {
  it('renders the page title and description', () => {
    render(<ReactHookFormPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /11. Forms with React Hook Form/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /`react-hook-form` is a powerful library for managing forms in React./i,
      ),
    ).toBeInTheDocument();
  });

  it('renders the SimpleForm component', () => {
    render(<ReactHookFormPage />);
    expect(screen.getByTestId('mock-simple-form')).toBeInTheDocument();
    expect(SimpleForm).toHaveBeenCalled(); // Ensure the mock was called
  });
});
