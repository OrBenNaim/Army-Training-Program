import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { DarkModeProvider, useDarkMode } from './utils/darkModeContext';
import HomePage from './pages/HomePage';
import ToDoListApp from './pages/TasksPage';
import Layout from './utils/Layout';


function App() {
  return (
    <DarkModeProvider>
      <MainApp />
    </DarkModeProvider>
  );
}


function MainApp() {
  const { isDarkMode } = useDarkMode();

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
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<ToDoListApp />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
