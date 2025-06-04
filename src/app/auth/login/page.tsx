'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { login } from '../actions';
export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Email dan password wajib diisi.');
      return;
    } else {
      const error = await login(email, password);
      if (error) {
        setShowError(error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& label': { color: 'primary.main' },
            '& label.Mui-focused': { color: 'primary.main' },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& label': { color: 'primary.main' },
            '& label.Mui-focused': { color: 'primary.main' },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {showError !== '' && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {showError}
          </Typography>
        )}

        <Typography variant="body2" color="black" sx={{ mt: 2 }}>
          Belum punya akun?{' '}
          <Link href="/auth/register" underline="hover" color="primary">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
