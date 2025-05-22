import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    useScrollTrigger,
    Slide,
    IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = () => {
    return (
        <HideOnScroll>
            <AppBar
                position="sticky"
                color="black"
                elevation={1}
                sx={{
                    py: 1,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo and Title */}
                        <Box
                            component={Link}
                            to="/home"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                mr: 4,
                            }}
                        >
                            <img
                                src={logo}
                                alt="Telemid-Aid Logo"
                                style={{
                                    height: "55px",
                                    marginRight: "12px",
                                }}
                            />
                            {/* <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    color: "#33b4d4",
                                    fontFamily: "'Montserrat', sans-serif",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                Telemid-Aid
                            </Typography> */}
                        </Box>

                        {/* Navigation Links */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Button
                                component={Link}
                                to="/"
                                sx={{
                                    textAlign:"center",
                                    mx: 1,
                                    mt: 1,
                                    color: "text.primary",
                                    fontSize: "18px",
                                    "&:hover": {
                                        color: "#33b4d4",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                About us
                            </Button>
                            <Button
                                component={Link}
                                to="/appointments"
                                sx={{
                                    mx: 1,
                                    mt: 1,
                                    color: "text.primary",
                                    fontSize: "18px",
                                    "&:hover": {
                                        color: "#33b4d4",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                Appointments
                            </Button>
                            <Button
                                component={Link}
                                to="/doctors"
                                sx={{
                                    mx: 1,
                                    mt: 1,
                                    color: "text.primary",
                                    fontSize: "18px",
                                    "&:hover": {
                                        color: "#33b4d4",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                Articles
                            </Button>
                            <Button
                                component={Link}
                                to="/doctors"
                                sx={{
                                    mx: 1,
                                    mt: 1,
                                    color: "text.primary",
                                    fontSize: "18px",
                                    "&:hover": {
                                        color: "#33b4d4",
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                Questions
                            </Button>
                        </Box>

                        {/* Auth Buttons */}
                        <IconButton
                            component={Link}
                            to="/questions"
                            sx={{
                                mx: 1,
                                color: "action",
                                "&:hover": {
                                    color: "#33b4d4",
                                    backgroundColor: "rgba(51, 180, 212, 0.04)",
                                },
                            }}
                        >
                            <Badge badgeContent={4} color="info">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <Box sx={{ display: "flex" }}>
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                sx={{
                                    mx: 1,
                                    fontSize: "18px",
                                    color: "#33b4d4",
                                    borderColor: "#33b4d4",
                                    "&:hover": {
                                        borderColor: "#2a96b3",
                                        backgroundColor:
                                            "rgba(51, 180, 212, 0.04)",
                                    },
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/signup"
                                variant="contained"
                                sx={{
                                    mx: 1,
                                    textAlign:"center",
                                    fontSize: "18px",
                                    backgroundColor: "#33b4d4",
                                    "&:hover": {
                                        backgroundColor: "#2a96b3",
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
};

export default Navbar;
