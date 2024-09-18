import React, { useMemo, useState } from 'react';
import { createTheme } from "@mui/material/styles";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/Scenes/navbar";
import DashBoard from "@/Scenes/dashboard";
import Predictions from "@/Scenes/prediction";
import AuthScreen from "@/components/SignupScreen"; // Ensure you have the correct path to your Login component
import { themeSettings } from "./theme";

const App: React.FC = () => {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar/>
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/predictions" element={<Predictions />} />
                </>
              ) : (
                <Route path="*" element={<AuthScreen setAuth={setAuthenticated} />} />
              )}
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
