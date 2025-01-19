import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { registerUser } from '../utils/apiUtils';

function SignUpPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const backend_response = await registerUser(username, password);
      console.log(backend_response);
      
      if (backend_response.status === 409){     // Error conflict -> Username already exists
        alert('The username is already taken. Please choose a different username.')
      }
      else {
        alert('Registration successful! Please sign in.');
        navigate('/signin');
      }
      
    } 
    catch (error) {
      console.error('Sign-up error:', error);
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
            Sign Up
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
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUpPage;
