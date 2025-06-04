'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { signup } from '../actions';

export default function UserRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [showError, setShowError] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Semua field wajib diisi.');
      return;
    } else {
      const error = await signup(email, password);
      if (error) {
        console.log(error);
        setShowError(error);
      } else {
        setShowError('');
        setConfirmEmail(true);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          User Registration
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& label': {
              color: 'primary.main',
            },
            '& label.Mui-focused': {
              color: 'primary.main',
            },
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
            '& label': {
              color: 'primary.main',
            },
            '& label.Mui-focused': {
              color: 'primary.main',
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Typography variant="body2" color="black" sx={{ mt: 2 }}>
          Sudah punya akun?{' '}
          <Link href="/auth/login" color="primary">
            Login
          </Link>
        </Typography>
        {confirmEmail && (
          <Box
            sx={{
              alignItems: 'center', // Menyelaraskan item secara vertikal
              backgroundColor: '#20C997', // Warna hijau standar untuk sukses dari tema MUI
              color: 'success.contrastText',
              p: 2,
              borderRadius: '8px',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .05)',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              Silakan periksa email Anda untuk konfirmasi registrasi.
            </Typography>
          </Box>
        )}
        {showError && (
          <Typography
            variant="body1"
            sx={{ fontWeight: 'medium', color: 'red' }}
          >
            {showError}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
