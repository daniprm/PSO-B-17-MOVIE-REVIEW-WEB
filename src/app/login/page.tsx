'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link
} from '@mui/material';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Email dan password wajib diisi.');
      return;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Login berhasil!');
      router.push('/');
    } else {
      const data = await res.json();
      alert(`Login gagal: ${data.message}`);
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

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Belum punya akun?{' '}
          <Link href="/register" underline="hover" color="primary">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}