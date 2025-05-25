import React from "react";
import { Fab, Zoom, useScrollTrigger, Box, useTheme, useMediaQuery } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects mobile screens
    
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={scrollToTop}
                role="presentation"
                sx={{
                    position: "fixed",
                    bottom: 50,
                    right: isMobile ? 25 : 60, // 16px on mobile, 60px on larger screens
                    zIndex: 1000,
                }}
            >
                <Fab
                    color="primary"
                    size={isMobile ? "medium" : "large"} // Smaller on mobile
                    aria-label="Scroll to top"
                    sx={{
                        backgroundColor: "#33b4d4",
                        "&:hover": {
                            backgroundColor: "#2a96b3",
                        },
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Zoom>
    );
};

export default ScrollToTop;