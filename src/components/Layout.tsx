import * as React from 'react';
import logo from '../assets/logo.png';
import { styled, useTheme } from '@mui/material/styles';
import type { Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import NewMenu from './NewMenu';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// 모바일용 오버레이 드로워
const MobileDrawer = styled(MuiDrawer)(() => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { keycloak } = useKeycloak();
  const userRole = useSelector((state: RootState) => state.userReducer.role);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AppBar position="fixed" open={!isMobile && open}>
        <Toolbar style={{ backgroundColor: '#fff' }}>
          <img src={logo} alt="Logo" style={{ width: 70, height: 50 }} />
          <Typography color='black' noWrap component="div" sx={{ flexGrow: 1 }}>
            Key Clock Project            
          </Typography>
          {keycloak.authenticated ? (
            <Button style={{ color: 'black' }} onClick={handleLogout}>로그아웃</Button>
          ) : (
            <Button style={{ color: 'black' }} component={Link} to="/login">로그인</Button>
          )}
          <IconButton
            style={{ color: 'black' }}
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="end"
            // sx={{
            //   ...(open && { display: 'none' }),
            // }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Main Content - 항상 고정된 크기 유지 */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: '100%',
          height: '100vh',
          overflow: 'auto',
          position: 'fixed',
          // 모바일에서 드로워가 열려있을 때 어둡게 처리
          ...(isMobile && open && {
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: theme.zIndex.drawer - 1,
              pointerEvents: 'none',
            },
            pointerEvents: 'none',
            '& > *': {
              pointerEvents: 'none',
            }
          })
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>

      {/* PC용 Permanent Drawer */}
      {!isMobile && (
        <Drawer variant="permanent" open={open} anchor="right">
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NewMenu open={open} userRole={userRole} openFn={handleDrawerOpen}/>
        </Drawer>
      )}

      {/* 모바일용 Temporary Drawer */}
      {isMobile && (
        <MobileDrawer
          variant="temporary"
          anchor="right"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // 모바일 성능 향상을 위해
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NewMenu open={open} userRole={userRole} openFn={handleDrawerOpen}/>
        </MobileDrawer>
      )}
    </Box>
  );
}
