import { styled } from "@mui/system";
import { Box } from "@mui/material";

const LogoTitleStyles = styled(Box)(({ theme }) => ({
  "& .logoTitleContainer": {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",

    "& .logoImage": {
      height: theme.spacing(6),
      width: theme.spacing(7),
      paddingRight: theme.spacing(1.5),
    },

    "& .logoTitle": {
      fontFamily: "Verdana",
      fontSize: theme.typography.pxToRem(24),
      fontWeight: "bold",
      color: theme.palette.primary.main,
      lineHeight: 1,
      "&.clickable": {
        cursor: "pointer",
      },
    },

    "& .logoSubtitle": {
      fontFamily: "Verdana",
      paddingLeft: theme.spacing(0.5),
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.secondary,
      display: "flex",
      justifyContent: "left",
      marginBottom: 0,
    },
  },
}));

export default LogoTitleStyles;