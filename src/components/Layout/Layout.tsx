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
  { text: '1. DOM vs VDOM', path: '/dom-vdom' },
  { text: '2. JSX', path: '/jsx' },
  { text: '3. Props', path: '/props' },
  { text: '4. useState', path: '/usestate' },
  { text: '5. useEffect', path: '/useeffect' },
  {
    text: '6. useContext',
    path: '/usecontext',
    children: [
      { text: '6.1 Simple Example', path: '/usecontext/simple-example' },
      { text: '6.2 Theme Switcher', path: '/usecontext/themeswitcher' },
    ],
  },
  { text: '7. useReducer', path: '/usereducer' },
  { text: '8. useMemo', path: '/usememo' },
  { text: '9. useCallback', path: '/usecallback' },
  { text: '10. React Query', path: '/react-query' },
  { text: '11. React Hook Form', path: '/react-hook-form' },
  { text: '12. useRef', path: '/useref' },
  { text: '13. Custom Hooks', path: '/custom-hooks' },
  { text: '14. Mutations', path: '/mutations' },
  { text: '15. Styling', path: '/styling' },
  {
    text: '16. Routing',
    path: '/routing',
    children: [
      { text: '16.1 Order List', path: '/routing/orders' },
      { text: '16.2 Order Detail', path: '/routing/orders/1002' },
    ],
  },
  { text: '17. Zustand', path: '/zustand' },
  { text: '18. i18n', path: '/i18n' },
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
