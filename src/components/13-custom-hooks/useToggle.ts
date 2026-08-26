import { useCallback, useState } from 'react';

/**
 * A boolean plus the three operations you always end up writing by hand.
 *
 * Returning a tuple (like `useState` does) lets the caller name things
 * whatever fits: `const [isOpen, toggleOpen] = useToggle();`
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((previous) => !previous), []);

  return [value, toggle] as const;
};
