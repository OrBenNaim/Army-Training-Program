import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { loginUser } from '../utils/apiUtils';

function SignInPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { accessToken } = await loginUser(username, password);
      localStorage.setItem('accessToken', accessToken);
      navigate('/app');
    } 
    catch (error) {
      console.error('Sign-in error:', error);
    }
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
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
            Sign In
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
            sx={{ marginBottom: 2 }}
          >
            Sign In
          </Button>
          <Button fullWidth onClick={() => navigate('/signup')}>
            Don't have an account? Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignInPage;
