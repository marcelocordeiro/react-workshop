import { Box, Button, Typography, styled as muiStyled } from '@mui/material';
import styled from 'styled-components';

// --- Option B: MUI's `styled()` -----------------------------------------
// Creates a reusable styled version of an existing MUI component. It has
// access to the MUI theme, so it stays consistent with light/dark mode.
const AccentButton = muiStyled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: theme.spacing(3),
  textTransform: 'none',
  fontWeight: 600,
}));

// --- Option C: styled-components ----------------------------------------
// Same idea, different library. Props drive the styles, and the generated
// class name is scoped to this component — no global CSS collisions.
const StatusPill = styled.span<{ $tone: 'ok' | 'warn' }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: ${({ $tone }) => ($tone === 'ok' ? '#2e7d32' : '#ed6c02')};
`;

const StylingDemo = () => (
  <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
    {/* --- Option A: the `sx` prop --------------------------------------- */}
    <Typography variant="h6" gutterBottom>
      A. The <code>sx</code> prop — one-off styles
    </Typography>
    <Box
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 1,
        bgcolor: 'action.hover',
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Typography>Spacing units, theme colours, no separate file.</Typography>
    </Box>

    <Typography variant="h6" gutterBottom>
      B. <code>styled()</code> from MUI — reusable, theme-aware
    </Typography>
    <Box sx={{ mb: 3 }}>
      <AccentButton variant="contained">Accent button</AccentButton>
    </Box>

    <Typography variant="h6" gutterBottom>
      C. <code>styled-components</code> — props drive the CSS
    </Typography>
    <Box sx={{ display: 'flex', gap: 1 }}>
      <StatusPill $tone="ok">active</StatusPill>
      <StatusPill $tone="warn">pending</StatusPill>
    </Box>

    <Typography variant="body2" sx={{ mt: 3 }} color="text.secondary">
      Rule of thumb: <code>sx</code> for a one-off tweak, <code>styled()</code>{' '}
      when the same look repeats. The <code>$</code> prefix on{' '}
      <code>$tone</code> is a styled-components convention meaning "styling
      input only — do not forward this to the DOM".
    </Typography>
  </Box>
);

export default StylingDemo;
