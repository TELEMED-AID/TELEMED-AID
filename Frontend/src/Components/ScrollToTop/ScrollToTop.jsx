import React from "react";
import { Fab, Zoom, useScrollTrigger, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true, // Shows immediately when crossing threshold
        threshold: 100, // Appears after scrolling 100px down
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
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
                    right: 60,

                    zIndex: 1000, // Ensures it stays above other content
                }}
            >
                <Fab
                    color="primary"
                    size="large"
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
