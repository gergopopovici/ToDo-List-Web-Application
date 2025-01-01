import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createUser } from '../services/UserService';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation(
    () =>
      createUser({
        username,
        password,
        email,
        phoneNumber,
        admin: false,
      }),
    {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (errorMessage: unknown) => {
        if (
          (errorMessage instanceof Error &&
            (errorMessage as { response?: { data?: { message?: string } } }).response &&
            (errorMessage as { response?: { data?: { message?: string } } }).response?.data &&
            (errorMessage as { response?: { data?: { message?: string } } }).response?.data?.message) ??
          'Registration was not successful'
        ) {
          setError((errorMessage as { response: { data: { message: string } } }).response.data.message);
        } else {
          setError('Registration was not successful');
        }
      },
    },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    mutation.mutate();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="Telephone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
