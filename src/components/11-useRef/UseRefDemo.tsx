import { useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

/**
 * `useRef` gives you a mutable box that survives re-renders.
 *
 * Two very different jobs, one hook:
 *   1. A handle on a real DOM node (focus, scroll, measure).
 *   2. A place to keep a value that must NOT trigger a re-render when it changes.
 */
const UseRefDemo = () => {
  // --- Job 1: a handle on a DOM node -------------------------------------
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Job 2: a value that changes without re-rendering ------------------
  // The interval id is bookkeeping, not UI. Storing it in state would be
  // wrong: every tick would schedule a render for a value nobody displays.
  const intervalRef = useRef<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const isRunning = intervalRef.current !== null;

  const start = () => {
    if (intervalRef.current !== null) return; // already running
    intervalRef.current = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current === null) return;
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
    // Force one render so the button labels update, since changing a ref
    // does not tell React anything.
    setSeconds((previous) => previous);
  };

  // Always clean up timers on unmount, or the callback keeps firing against
  // a component that no longer exists.
  useEffect(
    () => () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    },
    [],
  );

  return (
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        1. A ref pointing at a DOM node
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          inputRef={inputRef}
          label="Search"
          size="small"
          variant="outlined"
        />
        <Button variant="contained" onClick={() => inputRef.current?.focus()}>
          Focus the input
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
        There is no "focused" state anywhere. We reach for the real element and
        call a browser API on it.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        2. A ref holding a value that must not re-render
      </Typography>
      <Typography>Elapsed: {seconds}s</Typography>
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Button variant="contained" onClick={start} disabled={isRunning}>
          Start
        </Button>
        <Button variant="outlined" onClick={stop} disabled={!isRunning}>
          Stop
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
        The visible counter lives in state. The interval id lives in a ref — it
        is internal bookkeeping, not something the user sees.
      </Typography>
    </Box>
  );
};

export default UseRefDemo;
