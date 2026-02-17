import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { loginIn } from '../services/LoginService';
import { Login } from '../models/Login';
import { useAuth } from '../context/AuthProvider';
import { ResponseUserDTO } from '../models/User'; // Import your user type

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logedIn } = useAuth();
  const { t } = useTranslation();

  const mutation = useMutation<ResponseUserDTO, Error, Login>((login: Login) => loginIn(login), {
    onSuccess: (data) => {
      if (data && data.id) {
        localStorage.setItem('userId', data.id.toString());

        logedIn();

        setTimeout(() => {
          navigate('/toDos');
        }, 1000000);
      }
    },
    onError: () => {
      setError(t('loginerror'));
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
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
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('login')}
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <TextField
          label={t('username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={mutation.isLoading}
        />
        <TextField
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={mutation.isLoading}
        />
        <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
          {mutation.isLoading ? t('loading') : t('submit')}
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/register')} disabled={mutation.isLoading}>
          {t('register')}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
