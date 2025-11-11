import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    expect(
      screen.getByText(/Welcome to the React Workshop!/i),
    ).toBeInTheDocument();
  });

  it('renders the navigation instruction', () => {
    render(<Home />);
    expect(
      screen.getByText(
        /Use the navigation on the left to explore the different React concepts./i,
      ),
    ).toBeInTheDocument();
  });
});
