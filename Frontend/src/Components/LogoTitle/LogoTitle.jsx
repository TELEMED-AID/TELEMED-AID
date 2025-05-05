import React from 'react';
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import {Box, Typography} from "@mui/material";
import LogoTitleStyles from "./LogoTitleStyles";
import { home } from "../../AppRoutes/DefaultRoutes";

const LogoTitle = ({ isDisabled  }) => {
  const navigate = useNavigate();

  return (
    <LogoTitleStyles>
      <Box className="logoTitleContainer">
        <img className="logoImage" src={logo} alt="Logo" />
        <Box>
          <Typography
            variant="h6"
            className={`logoTitle ${!isDisabled ? "clickable" : ""}`}
            onClick={() => !isDisabled && navigate(home)}
          >
            Telemid-Aid
          </Typography>
        </Box>
      </Box>
    </LogoTitleStyles>
  );
};

export default LogoTitle;