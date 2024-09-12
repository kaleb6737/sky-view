import { Link } from 'react-router-dom'; 
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import FlexBetween from '@/components/flexBetween';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

import { styled } from '@mui/system';
import  StyledButton from '@/components/StyledButton';

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');

  const handleIconClick = () => {
    setSelected('dashboard');
    window.location.reload(); // Refresh the page
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem" color={palette.grey[300]}>
      {/* left side */}
      <FlexBetween gap="0.75rem">
        <Link to="/" onClick={handleIconClick} style={{ color: 'inherit', textDecoration: 'none' }}>
          <ViewInArIcon sx={{ fontSize: '30px' }} />
        </Link>
        <Typography variant="h4" fontSize="16px">
          SkyView Wealth  
        </Typography>
      </FlexBetween>

      {/* right side */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[500],
              textDecoration: 'inherit', // Corrected to camelCase
            }}
          >
            <StyledButton> Dashboard</StyledButton>
           
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[100],
              textDecoration: 'inherit', // Corrected to camelCase
            }}
          >
            <StyledButton> Predictoins</StyledButton>
          </Link>
        </Box>
        {/* Remove empty Box or add content */}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
