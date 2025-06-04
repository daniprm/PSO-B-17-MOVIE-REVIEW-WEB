'use client';
import Link from 'next/link';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';

export default function UserRegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert('Semua field wajib diisi.');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      alert('Registrasi berhasil!');
      router.push('/login');
    } else {
      const data = await res.json();
      alert(`Registrasi gagal: ${data.message}`);
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
            }
            }}
        />
        <TextField
          fullWidth
          label="Username"
          type="email"
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& label': {
                color: 'primary.main',
            },
            '& label.Mui-focused': {
                color: 'primary.main',
            }
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
            }
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

        <Typography color="text.primary" variant="body2" align="center" sx={{ mt: 2 }}>
            sudah punya akun?{' '}
            <Link href="/login" passHref>
                <Typography component="span" color="text.primary" sx={{ cursor: 'pointer', fontWeight: 400 }}>
                    Login
                </Typography>
            </Link>
        </Typography>
        
      </Box>
    </Container>
  );
}
