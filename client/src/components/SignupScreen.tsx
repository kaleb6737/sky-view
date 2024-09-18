import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Box, Typography, CssBaseline, Container, Snackbar } from '@mui/material';

function AuthScreen({ setAuth }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Sign In and Sign Up

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
        setLoading(false);
        setMessage('Registration successful!');
        setSnackbarOpen(true);
        setAuth(true);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
        setSnackbarOpen(true);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
        setLoading(false);
        setMessage('Sign-in successful!');
        setSnackbarOpen(true);
        setAuth(true);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
        setSnackbarOpen(true);
      });
  };

  // Toggle between Sign In and Sign Up
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
          padding: '2rem',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
          }}
        >
          {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Register'}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}
          />
          {isLogin ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%)',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem',
                borderRadius: '10px',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1565c0 0%, #1976d2 100%)',
                },
              }}
              onClick={signIn}
              disabled={loading}
            >
              Sign In
            </Button>
          ) : (
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{
                mt: 1,
                mb: 2,
                color: '#1976d2',
                borderColor: '#1976d2',
                fontWeight: 'bold',
                padding: '0.75rem',
                borderRadius: '10px',
                '&:hover': {
                  borderColor: '#1565c0',
                  color: '#1565c0',
                },
              }}
              onClick={register}
              disabled={loading}
            >
              Register
            </Button>
          )}
        </Box>

        {/* Toggle between Sign In and Register */}
        <Button
          type="button"
          onClick={toggleMode}
          sx={{
            mt: 2,
            color: '#1976d2',
            textDecoration: 'underline',
            fontWeight: 'bold',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#1565c0',
            },
          }}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </Container>
  );
}

export default AuthScreen;
