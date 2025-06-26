import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
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
import { Logout as LogoutIcon } from "@mui/icons-material"; // Import the icon
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../Assets/logo.png";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { removeUser } from "../../Redux/userSlice"; // Import your Redux action

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
const activeGradient = {
    background: "linear-gradient(135deg, #b3e5fc 0%, #e1f5fe 60%)",
    color: "text.primary",
    borderRadius: "4px",
};
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { name: "Home", path: "/home" },
        { name: "Profile", path: "/profile" },
        { name: "My Appointments", path: "/my-appointments" },
        { name: "Book an Appointment", path: "/book-appointment" },
        { name: "Articles", path: "/ShowArticles" },
        { name: "Questions", path: "/ShowQuestions" },
        { name: "Chat Room", path: "/chat" },
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
                        key={item.name}
                        component={Link}
                        to={item.path}
                        onClick={handleDrawerToggle}
                        sx={{
                            my: 0.5,
                            mx: 1,
                            borderRadius: "4px",
                            ...(location.pathname === item.path
                                ? activeGradient
                                : {
                                      color: "inherit",
                                      "&:hover": {
                                          color: "#33b4d4",
                                          backgroundColor:
                                              "rgba(51, 180, 212, 0.04)",
                                      },
                                  }),
                        }}
                    >
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem
                    component={Link}
                    to="/questions"
                    onClick={handleDrawerToggle}
                    color= "text.primary"
                    sx={{
                        color: "text.primary",
                        "&:hover": {
                            color: "#33b4d4",
                        },
                    }}
                >
                    <Badge badgeContent={4} color="info" sx={{ mr: 2 }}>
                        <MailIcon />
                    </Badge>
                    <ListItemText primary="Messages"  />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            dispatch(removeUser()); // Dispatch the removeUser action
                            navigate("/"); // Navigate to home
                        }}
                        sx={{
                            mx: 1,
                            fontSize: "18px",
                            backgroundColor: "#33b4d4",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#424242",
                            },
                        }}
                    >
                        Logout
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
                                            fontSize: "18px",
                                            ...(location.pathname === item.path
                                                ? activeGradient
                                                : {
                                                      color: "text.primary",
                                                      "&:hover": {
                                                          color: "#33b4d4",
                                                          backgroundColor:
                                                              "transparent",
                                                      },
                                                  }),
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

                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    alignItems: "center",
                                    gap: 1, // Adds spacing between items
                                }}
                            >
                                <IconButton
                                    component={Link}
                                    to="/questions"
                                    sx={{
                                        mx: 1,
                                        "&:hover": {
                                            color: "#33b4d4",
                                            backgroundColor:
                                                "rgba(51, 180, 212, 0.04)",
                                        },
                                    }}
                                >
                                    <Badge badgeContent={4} color="info">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>

                                {/* Logout Button */}
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        dispatch(removeUser()); // Dispatch the removeUser action
                                        navigate("/"); // Navigate to home
                                    }}
                                    sx={{
                                        mx: 1,
                                        fontSize: "18px",
                                        backgroundColor: "#33b4d4",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#424242",
                                        },
                                    }}
                                >
                                    Logout
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
