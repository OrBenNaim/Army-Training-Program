// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { loginUser } from '../utils/apiUtils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { FormType } from '../types';

function SignInPage(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>();
  const navigate = useNavigate();

  const { mutateAsync: authenticateUser } = useMutation({ 
    mutationFn: loginUser 
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const server_response = await authenticateUser(data);  

    if (!server_response.accessToken)   // Means that there are errors with the user credentials
    {
      alert('Unable to find the requested resource. Please check your credentials or try again later.');
    }
    else {
      const { accessToken } = server_response;
      localStorage.setItem('accessToken', accessToken);
      navigate('/app');
    }
    
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters",
                },
              })}
              sx={{ marginBottom: 2 }}
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters",
                },
              })}
              sx={{ marginBottom: 2 }}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
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
    </form>
    
  );
}

export default SignInPage;
