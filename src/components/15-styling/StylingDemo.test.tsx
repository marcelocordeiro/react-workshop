import { render, screen } from '@testing-library/react';
import StylingDemo from './StylingDemo';

describe('StylingDemo', () => {
  it('renders all three styling approaches', () => {
    render(<StylingDemo />);

    expect(
      screen.getByRole('button', { name: /Accent button/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('gives styled-components a generated class name', () => {
    render(<StylingDemo />);

    // We assert that styling was applied at all, not the exact CSS.
    // Asserting on colours or class names couples the test to the design.
    expect(screen.getByText('active').className).not.toBe('');
  });
});
