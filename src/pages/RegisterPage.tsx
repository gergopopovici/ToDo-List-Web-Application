import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { createUser } from '../services/UserService';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries('users');
        navigate('/login');
      },
      onError: (errorMessage: unknown) => {
        if (
          (errorMessage instanceof Error &&
            (errorMessage as { response?: { data?: { message?: string } } }).response &&
            (errorMessage as { response?: { data?: { message?: string } } }).response?.data &&
            (errorMessage as { response?: { data?: { message?: string } } }).response?.data?.message) ??
          t('registererror')
        ) {
          setError((errorMessage as { response: { data: { message: string } } }).response.data.message);
        } else {
          setError(t('registererror'));
        }
      },
    },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError(t('passwordmatcherror'));
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
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('register')}
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <TextField
          label={t('username')}
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label={t('password')}
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label={t('confirmpassword')}
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField label={t('email')} variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label={t('phonenumber')}
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button type="submit" variant="contained">
          {t('submit')}
        </Button>
        <Button variant="contained" onClick={() => navigate('/login')}>
          {t('login')}
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
