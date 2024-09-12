import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Typography, Container, CssBaseline, Switch, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSignupUserMutation, useLoginUserMutation } from '@/state/api';

interface AuthProps {
  setAuth: (authStatus: boolean) => void;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    background: { default: '#121212', paper: '#1c1c1c' },
    text: { primary: '#ffffff' }
  }
});

const Auth: React.FC<AuthProps> = ({ setAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser, { isLoading: isSignupLoading }] = useSignupUserMutation();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  // Effect to check token presence and validity
 

  const handleAuth = async () => {
    try {
      const credentials = { username, password };
      const result = isSignup ? await signupUser(credentials).unwrap() : await loginUser(credentials).unwrap();
      if (result.token) {
        localStorage.setItem('token', result.token);
        setAuth(true);
      } else {
        alert('Authentication successful without token generation.');
      }
    } catch (error) {
      console.error(error);
      alert(isSignup ? 'Signup failed: please choose a diffrent username, useralready exists' : 'Login failed');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ color: 'white' }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {isSignup ? 'Sign Up' : 'Login'}
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAuth}
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSignup ? isSignupLoading : isLoginLoading}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
          <FormControlLabel
            control={<Switch checked={isSignup} onChange={() => setIsSignup(!isSignup)} />}
            label={isSignup ? "Switch to Login" : "Switch to Sign Up"}
            sx={{ mt: 2 }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Auth;
