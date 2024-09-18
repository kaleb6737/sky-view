import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure your Firebase is properly initialized
import { TextField, Button, Box, Typography, CssBaseline, Container, Snackbar } from '@mui/material';

interface AuthScreenProps {
  setAuth: (authStatus: boolean) => void; // Explicitly define the type for setAuth
}

function AuthScreen({ setAuth }: AuthScreenProps) {
  // Define useRef types for email and password fields
  const emailRef = useRef<HTMLInputElement>(null); 
  const passwordRef = useRef<HTMLInputElement>(null);

  // State variables
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Sign In and Sign Up

  // Close the Snackbar notification
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Register function to handle user sign up
  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (emailRef.current && passwordRef.current) {
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
          console.log(authUser);
          setLoading(false);
          setMessage('Registration successful!');
          setSnackbarOpen(true);
          setAuth(true); // Trigger auth status update after registration
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.message);
          setSnackbarOpen(true);
        });
    } else {
      setMessage('Please fill in both fields.');
      setSnackbarOpen(true);
    }
  };

  // Sign In function to handle user login
  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (emailRef.current && passwordRef.current) {
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
          console.log(authUser);
          setLoading(false);
          setMessage('Sign-in successful!');
          setSnackbarOpen(true);
          setAuth(true); // Trigger auth status update after sign in
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.message);
          setSnackbarOpen(true);
        });
    } else {
      setMessage('Please fill in both fields.');
      setSnackbarOpen(true);
    }
  };

  // Toggle between Sign In and Sign Up modes
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
        <Box component="form" noValidate onSubmit={isLogin ? signIn : register} sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant={isLogin ? "contained" : "outlined"}
            sx={{
              mt: 3,
              mb: 2,
              background: isLogin
                ? 'linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%)'
                : 'transparent',
              color: isLogin ? 'white' : '#1976d2',
              fontWeight: 'bold',
              padding: '0.75rem',
              borderRadius: '10px',
              '&:hover': {
                background: isLogin
                  ? 'linear-gradient(90deg, #1565c0 0%, #1976d2 100%)'
                  : 'transparent',
              },
            }}
            disabled={loading}
          >
            {isLogin ? 'Sign In' : 'Register'}
          </Button>
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
