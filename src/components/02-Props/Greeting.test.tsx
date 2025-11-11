import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Greeting from './Greeting';

describe('Greeting', () => {
  it('renders the greeting message with the provided name', () => {
    render(<Greeting name="TestUser" />);
    expect(
      screen.getByRole('heading', { level: 2, name: /Hello, TestUser!/i }),
    ).toBeInTheDocument();
  });

  it('renders children content when provided', () => {
    render(
      <Greeting name="TestUser">
        <p>This is a child paragraph.</p>
        <span>Another child element.</span>
      </Greeting>,
    );
    expect(screen.getByText(/This is a child paragraph./i)).toBeInTheDocument();
    expect(screen.getByText(/Another child element./i)).toBeInTheDocument();
  });

  it('renders without children when no children are provided', () => {
    render(<Greeting name="NoChildren" />);
    expect(
      screen.getByRole('heading', { level: 2, name: /Hello, NoChildren!/i }),
    ).toBeInTheDocument();
    // Ensure no unexpected children are rendered
    expect(
      screen.queryByText(/This is a child paragraph./i),
    ).not.toBeInTheDocument();
  });
});
