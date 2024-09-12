import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjusted to a semi-transparent black for blending
    borderRadius: "1rem",
    boxShadow: "none", // Removed for blending
    transition: "all 0.3s ease", // Added for smooth transitions
    '&:hover': {
        boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)", // Shadow appears on hover
    },
}));

export default DashboardBox;



// s(~n+($r723SBSc