import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { DarkModeProvider, useDarkMode } from './utils/darkModeContext';
import HomePage from './pages/HomePage';
import ToDoListApp from './pages/TasksPage';
import Layout from './utils/Layout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <MainApp />
    </DarkModeProvider>
    </QueryClientProvider>

  );
}


function MainApp() {
  const { isDarkMode } = useDarkMode();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  // Create MUI theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Wrap all routes in Layout */}
        <Layout>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route 
              path="/app" 
              element={isAuthenticated ? <ToDoListApp /> : <Navigate to="/signin" />}
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
