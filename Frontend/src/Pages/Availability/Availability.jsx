import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Autocomplete,
    Paper,
    IconButton,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Delete } from "@mui/icons-material";
import Title from "../../Components/Title/Title";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

const Availability = () => {
    const [availability, setAvailability] = useState({
        days: [],
    });

    const addNewDay = () => {
        setAvailability({
            ...availability,
            days: [
                ...availability.days,
                {
                    dayOfWeek: "",
                    timeSlots: [],
                },
            ],
        });
    };

    const handleDayChange = (index, value) => {
        const updatedDays = [...availability.days];
        updatedDays[index].dayOfWeek = value;
        setAvailability({ ...availability, days: updatedDays });
    };

    const addTimeSlot = (dayIndex) => {
        const updatedDays = [...availability.days];
        updatedDays[dayIndex].timeSlots.push({
            startTime: "08:00:00",
            duration: 1,
        });
        setAvailability({ ...availability, days: updatedDays });
    };

    const handleTimeChange = (dayIndex, slotIndex, newValue) => {
        const updatedDays = [...availability.days];
        updatedDays[dayIndex].timeSlots[slotIndex].startTime =
            dayjs(newValue).format("HH:mm:ss");
        setAvailability({ ...availability, days: updatedDays });
    };

    const handleDurationChange = (dayIndex, slotIndex, value) => {
        const updatedDays = [...availability.days];
        updatedDays[dayIndex].timeSlots[slotIndex].duration = parseInt(value);
        setAvailability({ ...availability, days: updatedDays });
    };

    const removeDay = (index) => {
        const updatedDays = availability.days.filter((_, i) => i !== index);
        setAvailability({ ...availability, days: updatedDays });
    };

    const removeTimeSlot = (dayIndex, slotIndex) => {
        const updatedDays = [...availability.days];
        updatedDays[dayIndex].timeSlots = updatedDays[
            dayIndex
        ].timeSlots.filter((_, i) => i !== slotIndex);
        setAvailability({ ...availability, days: updatedDays });
    };

    const handleSubmit = () => {
        console.log("Final Availability Data:", availability);
        // Here you would typically send the data to your backend
    };

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Title title="Set Your Availability" />
                        <Button
                            variant="contained"
                            onClick={addNewDay}
                            sx={{
                                mb: 2,
                                width: "100%",
                                py: 1.5,
                                fontSize: "1.1rem",
                                textTransform: "none",
                                bgcolor: "#33b4d4",
                                "&:hover": { bgcolor: "#2c3e50" },
                            }}
                        >
                            Add New Day
                        </Button>

                        {availability.days.map((day, dayIndex) => (
                            <Paper
                                key={dayIndex}
                                elevation={1}
                                sx={{
                                    px: 2,
                                    pt: 0.2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "flex",
                                        justifyContent: "center",
                                        mb: 4,
                                        // alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: {
                                                xs: "400px",
                                                sm: "800px",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "row",
                                                }, // Stack on mobile, row on desktop
                                                gap: 2, // Consistent spacing between items
                                                justifyContent: "space-evenly",
                                                mb: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        sm: "30%",
                                                    }, // Full width on mobile, 45% on desktop
                                                }}
                                            >
                                                <Autocomplete
                                                    options={daysOfWeek}
                                                    value={day.dayOfWeek}
                                                    onChange={(_, newValue) =>
                                                        handleDayChange(
                                                            dayIndex,
                                                            newValue
                                                        )
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Day of Week"
                                                        />
                                                    )}
                                                    disableClearable
                                                />
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        sm: "30%",
                                                    }, // Full width on mobile, 45% on desktop
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        addTimeSlot(dayIndex)
                                                    }
                                                    sx={{
                                                        width: "100%",
                                                        py: 1.5,
                                                        fontSize: "1.1rem",
                                                        textTransform: "none",
                                                        bgcolor: "#33b4d4",
                                                        "&:hover": {
                                                            bgcolor: "#2c3e50",
                                                        },
                                                    }}
                                                >
                                                    Add Time Slot
                                                </Button>
                                            </Box>
                                            <IconButton
                                                sx={
                                                    {
                                                        // px:17,
                                                        // "&:hover": { bgcolor: "transparent" }
                                                    }
                                                }
                                                onClick={() =>
                                                    removeDay(dayIndex)
                                                }
                                            >
                                                <Delete color="error" />
                                            </IconButton>
                                        </Box>
                                        {day.timeSlots.map(
                                            (slot, slotIndex) => (
                                                <React.Fragment key={slotIndex}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: {
                                                                xs: "column",
                                                                sm: "row",
                                                            }, // Stack on mobile, row on desktop
                                                            gap: 2, // Consistent spacing between items
                                                            justifyContent:
                                                                "space-evenly",
                                                            mb: 2,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: {
                                                                    xs: "100%",
                                                                    sm: "30%",
                                                                }, // Full width on mobile, 45% on desktop
                                                            }}
                                                        >
                                                            <TimePicker
                                                                label="Start Time"
                                                                value={dayjs(
                                                                    slot.startTime,
                                                                    "HH:mm:ss"
                                                                )}
                                                                onChange={(
                                                                    newValue
                                                                ) =>
                                                                    handleTimeChange(
                                                                        dayIndex,
                                                                        slotIndex,
                                                                        newValue
                                                                    )
                                                                }
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <TextField
                                                                        {...params}
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                width: {
                                                                    xs: "100%",
                                                                    sm: "30%",
                                                                }, // Full width on mobile, 45% on desktop
                                                            }}
                                                        >
                                                            <TextField
                                                                label="Duration (hours)"
                                                                type="number"
                                                                value={
                                                                    slot.duration
                                                                }
                                                                onChange={(e) =>
                                                                    handleDurationChange(
                                                                        dayIndex,
                                                                        slotIndex,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                sx={{
                                                                    width: "100%",
                                                                }}
                                                            />
                                                        </Box>
                                                        <IconButton
                                                            onClick={() =>
                                                                removeTimeSlot(
                                                                    dayIndex,
                                                                    slotIndex
                                                                )
                                                            }
                                                        >
                                                            <Delete color="error" />
                                                        </IconButton>
                                                    </Box>
                                                </React.Fragment>
                                            )
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                }, // Stack on mobile, row on desktop
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: "0%",
                                        sm: "50%",
                                    }, // Full width on mobile, 45% on desktop
                                }}
                            ></Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "33%",
                                    }, // Full width on mobile, 45% on desktop
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    bgcolor: "#c2185b",
                                    "&:hover": { bgcolor: "#880e4f" },
                                }}
                                disabled={availability.days.length === 0}
                            >
                                Save Availability
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </LocalizationProvider>
            <Footer />
        </>
    );
};

export default Availability;
