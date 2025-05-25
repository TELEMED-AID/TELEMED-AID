import React from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
} from "@mui/material";
import {
    AccessTime,
    CalendarToday,
    Person,
    Phone,
    Public,
    Work,
} from "@mui/icons-material";
import Title from "../../Components/Title/Title";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
const MyAppointments = ({ appointments }) => {
    // Function to format the date
    const formatDate = (dateString) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to format time (remove seconds)
    const formatTime = (timeString) => {
        return timeString.substring(0, 5);
    };

    // Status chip colors
    const statusColors = {
        PENDING: "warning",
        COMPLETED: "success",
        CANCELLED: "error",
        CONFIRMED: "info",
    };
    const handleCancelAppointment = (appointment) => {
        // Here you would typically make an API call to cancel the appointment
        console.log("Cancelling appointment:", appointment);
    };
    return (
        <>
            <Navbar />
            <Box sx={{ p: 3, maxWidth: 1700, margin: "0 auto" }}>
                <Title title="My Appointments" />

                {appointments?.length === 0 ? (
                    <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                        <Typography variant="h6">
                            No appointments scheduled
                        </Typography>
                    </Paper>
                ) : (
                    <Grid
                        container
                        spacing={5}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {appointments.map((appointment, index) => (
                            <Grid item xs={12} md={12} key={index}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        width: {xs:"360px", md:"500px"},
                                        height: "100%",
                                        boxShadow:
                                            "0px 10px 25px rgba(0, 0, 0, 0.1)",
                                        borderLeft: `10px solid ${
                                            appointment.state === "COMPLETED"
                                                ? "#4caf50"
                                                : appointment.state ===
                                                "PENDING"
                                                ? "#ff9800"
                                                : "#f44336"
                                        }`,
                                        transition: "transform 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 2 }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "#33b4d4",
                                                    width: 60,
                                                    height: 60,
                                                    fontSize: "1.3rem",
                                                }}
                                            >
                                                {appointment.doctorDetails.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {
                                                        appointment
                                                            .doctorDetails.name
                                                    }
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        appointment
                                                            .doctorDetails
                                                            .specialization
                                                    }
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        <Divider sx={{ my: 2 }} />

                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <CalendarToday
                                                        color="action"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {formatDate(
                                                            appointment.date
                                                        )}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <AccessTime
                                                        color="action"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {formatTime(
                                                            appointment.time
                                                        )}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Phone
                                                        color="action"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            appointment
                                                                .doctorDetails
                                                                .phone
                                                        }
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Public
                                                        color="action"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            appointment
                                                                .doctorDetails
                                                                .countryName
                                                        }
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Work
                                                        color="action"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            appointment
                                                                .doctorDetails
                                                                .careerLevel
                                                        }
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Person
                                                        color="action"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            appointment
                                                                .doctorDetails
                                                                .gender
                                                        }
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                        <Box
                                            sx={{
                                                mt: 2,
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                gap: 1,
                                            }}
                                        >
                                            {appointment.state === "PENDING" ||
                                            appointment.state ===
                                                "CONFIRMED" ? (
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() =>
                                                        handleCancelAppointment(
                                                            appointment
                                                        )
                                                    }
                                                    sx={{
                                                        textTransform: "none",
                                                        fontWeight: "bold",
                                                        borderRadius: "",
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            ) : null}
                                            <Chip
                                                label={appointment.state}
                                                color={
                                                    statusColors[
                                                        appointment.state
                                                    ] || "default"
                                                }
                                                variant="outlined"
                                                sx={{
                                                    fontWeight: "bold",
                                                    textTransform: "uppercase",
                                                }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default MyAppointments;
