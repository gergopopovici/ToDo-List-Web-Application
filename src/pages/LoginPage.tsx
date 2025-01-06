import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';
import { loginIn } from '../services/LoginService';
import { Login } from '../models/Login';
import { useAuth } from '../Contexts/AuthProvider';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { logedIn } = useAuth();
  const { t } = useTranslation();

  const mutation = useMutation((login: Login) => loginIn(login), {
    onSuccess: () => {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        navigate('/toDos');
        logedIn();
      }, 1500);
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
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      {showConfetti && <Confetti />}
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
          {t('login')}
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <TextField label={t('username')} value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField
          label={t('password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
          {t('submit')}
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
          {t('register')}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
