import React, { useState, useEffect } from "react";
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
    CircularProgress,
} from "@mui/material";
import {
    AccessTime,
    CalendarToday,
    Person,
    Phone,
    Public,
    Work,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import Title from "../../Components/Title/Title";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import useGet from "../../Hooks/useGet";
import useDelete from "../../Hooks/useDelete";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useSelector((state) => state.user);
    const { loading, getItem } = useGet();
    const { loading: cancelLoading, deleteItem } = useDelete();

    // Function to fetch appointments from backend
    const fetchAppointments = async () => {
        const response = await getItem(
            `api/appointment/user/${userId}`,
            false, // disable automatic snackbar
            (data) => {
                // console.log("Successfully fetched appointments:", data);
                setAppointments(data);
                setError(null);
            },
            (err) => {
                setError("Failed to fetch appointments");
                console.error("Error fetching appointments:", err);
            }
        );
    };

    useEffect(() => {
        if (userId) {
            fetchAppointments();
        }
    }, [userId]);

    // Function to handle appointment cancellation
    const handleCancelAppointment = async (appointment) => {
        const cancellationData = {
            userId: userId, 
            doctorId: appointment.doctorDetails.userId, // Assuming doctor ID is nested under 'doctorDetails'
            date: appointment.date,
            time: appointment.time,
            state: "PENDING", // Set the state to CANCELLED as required
        };
        await deleteItem(
            `/api/appointment/cancel`,
            cancellationData, // Pass the data payload here
            (data) => {
                // deleteCallback
                // Success callback - refresh appointments
                fetchAppointments();
            },
            "Appointment cancelled successfully", // successMessage
            "Failed to cancel appointment", // errorMessage
            (err) => {
                // errorCallback
                console.error("Error cancelling appointment:", err);
            },
            true // showSnackbar (explicitly true for cancellation feedback)
        );
    };

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

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
                <Button
                    variant="contained"
                    onClick={fetchAppointments}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <>
            <ScrollToTop />
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
                            <Grid key={index}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        width: { xs: "360px", md: "500px" },
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
                                                    }{" "}
                                                    (
                                                    {
                                                        appointment
                                                            .doctorDetails
                                                            .userId
                                                    }
                                                    )
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
                                            <Grid>
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
                                            <Grid>
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
                                            <Grid>
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
                                            <Grid >
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
                                                        }{" "}
                                                        (
                                                        {
                                                            appointment
                                                                .doctorDetails
                                                                .countryId
                                                        }
                                                        )
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid>
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
                                            <Grid>
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
                                                    disabled={cancelLoading}
                                                    sx={{
                                                        textTransform: "none",
                                                        fontWeight: "bold",
                                                        borderRadius: "",
                                                    }}
                                                >
                                                    {cancelLoading ? (
                                                        <CircularProgress
                                                            size={24}
                                                        />
                                                    ) : (
                                                        "Cancel"
                                                    )}
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
