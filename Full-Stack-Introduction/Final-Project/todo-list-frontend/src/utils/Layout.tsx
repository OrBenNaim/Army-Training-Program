import React from 'react';
import { Box, AppBar, Toolbar, Typography, Switch, FormControlLabel } from '@mui/material';
import { useDarkMode } from './darkModeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }}>
      {/* AppBar or Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            To-Do List App
          </Typography>
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={toggleDarkMode} />}
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box 
        sx={{ padding: 1 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
