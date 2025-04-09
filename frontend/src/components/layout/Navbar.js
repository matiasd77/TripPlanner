import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = isAuthenticated
    ? [
        { label: 'My Trips', path: '/trips' },
        { label: 'Profile', path: '/profile' },
      ]
    : [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
      ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'grey.200',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
                onClick={() => handleNavigation('/')}
              >
                <ExploreIcon sx={{ mr: 1 }} />
                Travel Planner
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {isAuthenticated && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleNavigation('/trips/new')}
                  sx={{ mr: 2 }}
                >
                  New Trip
                </Button>
              )}
              
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {isAuthenticated && (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            pt: 2,
            pb: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleNavigation('/trips/new')}
              sx={{ mx: 2, mb: 2 }}
            >
              New Trip
            </Button>
          )}

          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                justifyContent: 'flex-start',
                px: 3,
                py: 1,
                textAlign: 'left',
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              sx={{
                justifyContent: 'flex-start',
                px: 3,
                py: 1,
                textAlign: 'left',
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
