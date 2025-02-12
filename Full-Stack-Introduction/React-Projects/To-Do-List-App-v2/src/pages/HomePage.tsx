import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { saveToLocalStorage } from '../utils/localStorageUtils';


function HomePage(): JSX.Element {
  const [username, setUserName] = useState('');
  
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (username.trim() === '') {
      alert('Please enter your name to continue.');
      return;
    }
    setUserName(username.trim());

    saveToLocalStorage('username', username);

    navigate('/app');
  };

  return (
    <Box
      sx={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 3,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <CardContent>
          <Grid2 container spacing={8} justifyContent="center">
            
            {/* Welcome Message */}
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                Welcome to your To-Do List App!
              </Typography>
            </Grid2>

            {/* Name Input */}
            <Grid2 size={{ xs: 12 }}>
              <TextField
                label="Enter your name"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': { color: '#1976d2' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#1976d2' },
                    '&:hover fieldset': { borderColor: '#115293' },
                  },
                }}
              />
            </Grid2>

            {/* Get Started Button */}
            <Grid2 size={{ xs: 12 }} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetStarted}
                size="large"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  padding: '10px 30px',
                }}
              >
                Get Started
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}

export default HomePage;
