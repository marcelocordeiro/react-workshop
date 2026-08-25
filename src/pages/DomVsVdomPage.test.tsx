import { render, screen } from '@testing-library/react';
import DomVsVdomPage from './DomVsVdomPage';

describe('DomVsVdomPage', () => {
  it('renders the page title and description', () => {
    render(<DomVsVdomPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /1\. DOM vs\. Virtual DOM \(VDOM\)/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /To be effective in React, it helps to understand the rendering engine/i,
      ),
    ).toBeInTheDocument();
  });

  it('renders reconciliation cycle details', () => {
    render(<DomVsVdomPage />);

    expect(screen.getByText(/1. State Change/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Render/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Diffing/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Commit/i)).toBeInTheDocument();
  });

  it('renders key takeaways', () => {
    render(<DomVsVdomPage />);

    expect(
      screen.getByText(/Render is cheap; commit is not/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/key defines identity/i)).toBeInTheDocument();
  });
});
