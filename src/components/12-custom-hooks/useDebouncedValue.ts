import { useEffect, useState } from 'react';

/**
 * Returns `value`, but only after it has stopped changing for `delayMs`.
 *
 * A custom hook is just a function whose name starts with `use` and that
 * calls other hooks. There is no framework registration, no annotation —
 * the naming convention is what makes the linter enforce the hook rules.
 */
export const useDebouncedValue = <T>(value: T, delayMs = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);

    // Cleanup cancels the pending timer whenever `value` changes again,
    // so only the last keystroke in a burst survives.
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
};
