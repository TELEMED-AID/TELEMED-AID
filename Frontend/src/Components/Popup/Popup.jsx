import React from "react";
import LoadingComponent from "@Components/LoadingComponent/LoadingComponent";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
} from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";
import themeCreator from "../../Themes/themeCreator";

const GenericPopup = ({
                          open,
                          sx,
                          title,
                          content,
                          buttons,
                          maxWidth,
                          icon, // Add icon prop
                          dialogContentSx = {},
                          dialogActionsSx = {},
                           loading=false,
                      }) => {
    const theme = themeCreator();
    return (
        <Dialog open={open} sx={sx} fullWidth maxWidth={maxWidth || "md"}>
            <DialogTitle fontWeight={"bold"}>
                <PageTitle
                    title={title}
                    PageIcon={icon} // Add icon prop
                    iconColor={theme.palette.primary.main}
                    breadcrumbs={false}
                ></PageTitle>
            </DialogTitle>

            <DialogContent sx={dialogContentSx}>{
               loading?(
                   <LoadingComponent size="5em" thickness={5} color={"primary"} />
               ) : content
            }
            </DialogContent>
            <DialogActions sx={dialogActionsSx}>
                {buttons.map((button) => (
                    <Button
                        key={button.text}
                        onClick={button.onClick}
                        color={button.color}
                        variant={button.variant}
                        disabled={button.loading || loading || false}
                    >
                        {!button.loading ? (
                            button.text
                        ) : (
                            <LoadingComponent size="2em" thickness={5} color={button.color} />
                        )}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};

export default GenericPopup;
