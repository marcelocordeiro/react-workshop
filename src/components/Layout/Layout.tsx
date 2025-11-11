import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

const drawerWidth = 240;

const navItems = [
  { text: 'Home', path: '/' },
  { text: '1. JSX', path: '/jsx' },
  { text: '2. Props', path: '/props' },
  { text: '3. useState', path: '/usestate' },
  { text: '4. useEffect', path: '/useeffect' },
  {
    text: '5. useContext',
    path: '/usecontext',
    children: [
      { text: '5.1 Simple Example', path: '/usecontext/simple-example' },
      { text: '5.2 Theme Switcher', path: '/usecontext/themeswitcher' },
    ],
  },
  { text: '6. useReducer', path: '/usereducer' },
  { text: '7. useMemo', path: '/usememo' },
  { text: '8. useCallback', path: '/usecallback' },
  { text: '9. React Query', path: '/react-query' },
  { text: '10. React Hook Form', path: '/react-hook-form' },
];

export const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            React Workshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <div key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.path}
                    selected={
                      currentPath === item.path ||
                      (item.children &&
                        item.children.some((child) =>
                          currentPath.startsWith(child.path),
                        ))
                    }
                  >
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
                {item.children && (
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {item.children.map((child) => (
                      <ListItem key={child.text} disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to={child.path}
                          selected={currentPath === child.path}
                        >
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
