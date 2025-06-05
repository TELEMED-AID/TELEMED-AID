import React, { useState } from "react";
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
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { name: "Profile", path: "/profile" },
        { name: "My Appointments", path: "/my-appointments" },
        { name: "Book an Appointment", path: "/book-appointment" },
        { name: "Articles", path: "/ShowArticles" },
        { name: "Questions", path: "/ShowQuestions" },
    ];

    const drawer = (
        <Box sx={{ textAlign: "center", width: 250 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                }}
            >
                <img
                    src={logo}
                    alt="Telemid-Aid Logo"
                    style={{ height: "40px" }}
                />
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleDrawerToggle}
                        sx={{
                            
                            "&:hover": {
                                color: "#33b4d4",
                            },
                        }}
                    >
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem
                    button
                    component={Link}
                    to="/questions"
                    onClick={handleDrawerToggle}
                    sx={{
                        
                        "&:hover": {
                            color: "#33b4d4",
                        },
                    }}
                >
                    <Badge badgeContent={4} color="info" sx={{ mr: 2 }}>
                        <MailIcon />
                    </Badge>
                    <ListItemText primary="Messages" />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem>
                    <Button
                        fullWidth
                        variant="outlined"
                        component={Link}
                        to="/login"
                        sx={{
                            mx: 1,
                            color: "#33b4d4",
                            borderColor: "#33b4d4",
                            "&:hover": {
                                borderColor: "#2a96b3",
                            },
                        }}
                    >
                        Login
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        fullWidth
                        variant="contained"
                        component={Link}
                        to="/signup"
                        sx={{
                            mx: 1,
                            backgroundColor: "#33b4d4",
                            "&:hover": {
                                backgroundColor: "#2a96b3",
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
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
                            {/* Logo */}
                            <Box
                                component={Link}
                                to="/home"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    flexGrow: { xs: 1, md: 0 },
                                    mr: { xs: 0, md: 4 },
                                }}
                            >
                                <img
                                    src={logo}
                                    alt="Telemid-Aid Logo"
                                    style={{
                                        height: "55px",
                                    }}
                                />
                            </Box>

                            {/* Desktop Navigation */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                {navItems.map((item) => (
                                    <Button
                                        key={item.name}
                                        component={Link}
                                        to={item.path}
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
                                        {item.name}
                                    </Button>
                                ))}
                            </Box>

                            {/* Mobile Menu Button */}
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{
                                    display: { md: "none" },
                                    mr: 1,
                                    
                                }}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* Desktop Auth Buttons */}
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    alignItems: "center",
                                }}
                            >
                                <IconButton
                                    component={Link}
                                    to="/questions"
                                    sx={{
                                        mx: 1,
                                        
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
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    sx={{
                                        mx: 1,
                                        fontSize: "18px",
                                        color: "black",
                                        borderColor: "#33b4d4",
                                        "&:hover": {
                                            borderColor: "#2a96b3",
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

            {/* Mobile Drawer */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 250,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default Navbar;