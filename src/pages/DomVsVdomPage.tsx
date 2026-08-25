import {
  Typography,
  Divider,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CommitIcon from '@mui/icons-material/Commit';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const DomVsVdomPage = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        1. DOM vs. Virtual DOM (VDOM)
      </Typography>

      <Typography paragraph>
        To be effective in React, it helps to understand the rendering engine.
        When state changes, React goes through a standard four-step cycle to
        keep the UI in sync with your data.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        The Reconciliation Cycle
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: 2, mb: 4, bgcolor: 'background.paper' }}
      >
        <List disablePadding>
          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <SettingsBackupRestoreIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="1. State Change"
              secondary={
                <Typography variant="body2" color="text.secondary">
                  You trigger an update by calling a state setter function,
                  e.g., <code>setCount(1)</code>. This schedules a re-render of
                  the component and its children.
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" sx={{ my: 1.5 }} />

          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <PlayArrowIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="2. Render"
              secondary={
                <Typography variant="body2" color="text.secondary">
                  React calls your component functions top-to-bottom and builds
                  a brand new Virtual DOM tree (a lightweight blueprint of plain
                  JavaScript objects).
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" sx={{ my: 1.5 }} />

          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <CompareArrowsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="3. Diffing"
              secondary={
                <Typography variant="body2" color="text.secondary">
                  React compares (diffs) the newly generated Virtual DOM tree
                  with the previous one to compute the exact delta (minimum
                  operations needed).
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" sx={{ my: 1.5 }} />

          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
              <CommitIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="4. Commit"
              secondary={
                <Typography variant="body2" color="text.secondary">
                  React surgically applies that minimal set of updates to the
                  real DOM (e.g., updating a single text node instead of
                  deleting and recreating the parent).
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Two Key Takeaways
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          mb: 4,
        }}
      >
        <Paper
          elevation={1}
          sx={{ p: 3, borderLeft: '4px solid', borderColor: 'warning.main' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FlashOnIcon color="warning" />
            <Typography variant="subtitle1" fontWeight="bold">
              Render is cheap; commit is not
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Creating plain JavaScript object blueprints in the Virtual DOM is
            fast and low-overhead. Modifying the real DOM, however, is very
            expensive because it forces the browser to recalculate layout and
            repaint pixels. Keep component renders pure to prevent useless
            computations!
          </Typography>
        </Paper>

        <Paper
          elevation={1}
          sx={{ p: 3, borderLeft: '4px solid', borderColor: 'info.main' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <VpnKeyIcon color="info" />
            <Typography variant="subtitle1" fontWeight="bold">
              key defines identity
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            A <code>key</code> defines element identity. React matches virtual
            nodes to real state using their key. By changing the key of a single
            component (e.g.,{' '}
            <code>
              &lt;UserForm key={'{'}userId{'}'} /&gt;
            </code>
            ), you can force React to completely unmount and rebuild that
            element from scratch, instantly resetting all of its local{' '}
            <code>useState</code>. This is a highly declarative way to reset
            form drafts or side drawer state without messy{' '}
            <code>useEffect</code> syncs!
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DomVsVdomPage;
