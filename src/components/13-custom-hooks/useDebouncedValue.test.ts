import { act, renderHook } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

// A custom hook is just a function, but it may only run inside a component.
// `renderHook` mounts a throwaway component for us, so we can unit-test the
// hook in isolation — no UI involved.
describe('useDebouncedValue', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('first', 500));
    expect(result.current).toBe('first');
  });

  it('only reports the last value of a burst of changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 500),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    rerender({ value: 'abc' });

    // Not enough time has passed: still the original value.
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('abc');
  });
});
