import { Link } from 'react-router-dom';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import FlexBetween from '@/components/flexBetween';

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

import StyledButton from '@/components/StyledButton';

type Props = {};

const Navbar = (props: Props) => {
  const { palette, breakpoints } = useTheme();
  const [selected, setSelected] = useState('dashboard');

  const handleIconClick = () => {
    setSelected('dashboard');
    window.location.reload(); // Refresh the page
  };

  return (
    <FlexBetween
      mb="0.25rem"
      p="0.5rem"
      color={palette.grey[300]}
      sx={{
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on extra small screens
        alignItems: 'center',
      }}
    >
      {/* left side */}
      <FlexBetween gap="0.75rem">
        <Link
          to="/"
          onClick={handleIconClick}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <ViewInArIcon
            sx={{
              fontSize: { xs: '25px', sm: '30px' }, // Smaller icon for small screens
            }}
          />
        </Link>
        <Typography
          variant="h4"
          fontSize={{
            xs: '14px', // Smaller font for extra small screens
            sm: '16px',
            md: '18px', // Medium and up
          }}
        >
          SkyView Wealth
        </Typography>
      </FlexBetween>

      {/* right side */}
      <FlexBetween
        gap={{
          xs: '1rem', // Reduced gap for smaller screens
          sm: '2rem',
        }}
        mt={{ xs: '1rem', sm: '0' }} // Add margin-top on small screens to separate items
      >
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[500],
              textDecoration: 'inherit',
            }}
          >
            <StyledButton>Dashboard</StyledButton>
          </Link>
        </Box>

        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[100],
              textDecoration: 'inherit',
            }}
          >
            <StyledButton>Predictions</StyledButton>
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
