import { styled } from '@mui/system';
import Button from "@mui/material/Button";

const StyledButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    color: "#ffffff",
    backgroundImage: 'linear-gradient(135deg, #3a92d6 0%, #2a6fb8 100%)', // Darker blue gradient
    boxShadow: '0 0.2rem 0.4rem rgba(0, 0, 0, 0.4), 0 0.1rem 0.2rem rgba(0, 0, 0, 0.3)',
    borderRadius: '1.5rem',
    padding: '0.75rem 1.5rem',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundImage: 'linear-gradient(135deg, #2a6fb8 0%, #3a92d6 100%)', // Darker blue gradient on hover
      boxShadow: '0 0.6rem 1.2rem rgba(0, 0, 0, 0.5), 0 0.3rem 0.6rem rgba(0, 0, 0, 0.4)',
      transform: 'scale(1.05)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, #74a9d8, #5c85c0)', // Darker blue gradient
      filter: 'blur(15px)',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
    '&:hover::before': {
      opacity: 1,
    },
}));

export default StyledButton;
