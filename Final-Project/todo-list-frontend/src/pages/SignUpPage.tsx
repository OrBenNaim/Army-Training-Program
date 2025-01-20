import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { registerUser } from '../utils/apiUtils';
import { useForm,SubmitHandler  } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';

type FormType ={
  username: string;
  password: string;
}
function SignUpPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<FormType>();
  const {mutateAsync: createUser} = useMutation({
    mutationFn: registerUser,
 
  })
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormType> =async (data) => {
    const result = await createUser(data);
        
    if (result.status === 409){     // Error conflict -> Username already exists
      alert('The username is already taken. Please choose a different username.')
    }
    else {
      alert('Registration successful! Please sign in.');
      navigate('/signin');
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
            Sign Up
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            {...register("username", {required:{
              message:"username required",
              value: true
            },minLength:{
              value:3,
              message: "3 letters at least "
            },})}
            sx={{ marginBottom: 2 }}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", {required:{
              message:"password required",
              value: true
            },minLength:{
              value:3,
              message: "3 letters at least "
            },})}       
            sx={{ marginBottom: 2 }}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type = 'submit'
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
    </form>

  );
}

export default SignUpPage;
