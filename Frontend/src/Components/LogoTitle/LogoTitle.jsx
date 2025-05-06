import React from 'react';
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import {Box, Typography} from "@mui/material";
import { home } from "../../AppRoutes/DefaultRoutes";

const LogoTitle = ({ isDisabled  }) => {
  const navigate = useNavigate();

  return (
      <Box 
        component="img"
        src={require('../../Assets/logo.png')}
        alt="Project Logo"
        sx={{
          mt: 4,
          height: { xs: 150, sm: 150, md: 150 }, // responsive sizing
          width: 'auto',
          maxWidth: '100%',
          display: 'block',
          mx: 'auto', // centers horizontally
        }}
      />
  );
};

export default LogoTitle;