import React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button, Chip } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";
import DropdownBox from "../../Components/DropDown/DropdownBox";
import { useForm } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
// Transform backend data to flat structure for DataGrid
const transformDoctorData = (doctors) => {
    return doctors.flatMap((doctor) =>
        doctor.availabilityDays.flatMap((day) =>
            day.timeslots.map((slot, slotIndex) => ({
                id: `${doctor.id}-${day.day}-${slotIndex}`,
                doctorId: doctor.id, // This will be our ID column
                fullName: doctor.fullName,
                specialization: doctor.specialization,
                careerLevel: doctor.careerLevel,
                day: day.day,
                timeslot: `${slot.startTime} (${slot.duration} mins)`,
                originalData: doctor,
            }))
        )
    );
};

const columns = [
    {
        field: "doctorId",
        headerName: "ID",
        width: 80,
        headerAlign: "center",
        headerClassName: "header",
        align: "center",
    },
    {
        field: "fullName",
        headerName: "Doctor",
        width: 180,
        headerAlign: "center",
        headerClassName: "header",
        align: "center",
    },
    {
        field: "specialization",
        headerName: "Specialization",
        width: 170,
        headerAlign: "center",
        headerClassName: "header",
        align: "center",
    },
    {
        field: "careerLevel",
        headerName: "Career Level",
        width: 170,
        headerAlign: "center",
        headerClassName: "header",
        align: "center",
    },
    {
        field: "day",
        headerName: "Availability Day",
        width: 170,
        headerAlign: "center",
        headerClassName: "header",
        align: "center",
    },
    {
        field: "timeslot",
        headerName: "Time Slot",
        width: 170,
        headerAlign: "center",
        headerClassName: "header",
        align: "center",
        renderCell: (params) => (
            <Chip
                label={params.value}
                color="primary"
                variant="outlined"
                sx={{
                    backgroundColor: "#e3f2fd",
                    borderColor: "#33b4d4",
                }}
            />
        ),
    },
    {
        field: "appointment",
        headerAlign: "center",
        headerName: "Book",
        width: 170,
        headerClassName: "header",
        align: "center",
        renderCell: (params) => (
            <Button
                variant="contained"
                size="small"
                onClick={() => handleBookAppointment(params.row)}
                sx={{
                    backgroundColor: "#33b4d4",
                    "&:hover": { backgroundColor: "#2a96b3" },
                }}
            >
                Book Now
            </Button>
        ),
    },
];
const doctorsData = [
    {
        id: 1,
        fullName: "Dr. Mohamed Aly Hassan",
        specialization: "Cardiology",
        careerLevel: "Consultant",
        availabilityDays: [
            {
                day: "Monday",
                timeslots: [
                    { startTime: "14:00:00", duration: 30 },
                    { startTime: "15:00:00", duration: 45 },
                ],
            },
            {
                day: "Wednesday",
                timeslots: [{ startTime: "10:00:00", duration: 30 }],
            },
        ],
    },
    {
        id: 2,
        fullName: "Dr. Kareem Tarek",
        specialization: "Dermatology",
        careerLevel: "Senior Specialist",
        availabilityDays: [
            {
                day: "Tuesday",
                timeslots: [
                    { startTime: "09:00:00", duration: 60 },
                    { startTime: "11:00:00", duration: 30 },
                ],
            },
        ],
    },
    {
        id: 3,
        fullName: "Dr. Mohamed ElNady",
        specialization: "Dermatology",
        careerLevel: "Senior Specialist",
        availabilityDays: [
            {
                day: "Tuesday",
                timeslots: [
                    { startTime: "09:00:00", duration: 60 },
                    { startTime: "11:00:00", duration: 30 },
                ],
            },
        ],
    },
];

const handleBookAppointment = (slotData) => {
    console.log("Booking appointment:", slotData);
    alert(
        `Booking ${slotData.fullName} on ${slotData.day} at ${slotData.timeslot}`
    );
};

const Appointment = () => {
    const rows = transformDoctorData(doctorsData);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0); // Total number of rows from backend
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const onSearchSubmit = (data) => {
        console.log("Form data:", {
            fullName: data.fullName,
            specialization: data.specialization,
            career: data.career,
            appointmentDate: data.appointmentDate
                ? dayjs(data.appointmentDate).format("YYYY-MM-DD")
                : null,
            appointmentTime: data.appointmentTime
                ? dayjs(data.appointmentTime).format("HH:mm")
                : null,
        });
    };
    return (
        <>
            <Navbar />
            {/* Search ****************** */}

            <form
                onSubmit={handleSubmit(onSearchSubmit)}
                className="formWrapper"
            >
                <Box
                    sx={{
                        mt: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 4,
                        // alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: "350px",
                                sm: "800px",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                                gap: 2, // Consistent spacing between items
                                justifyContent: "space-evenly",
                                // mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "33%" }, // Full width on mobile, 45% on desktop
                                }}
                            >
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Full Name
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Full Name"
                                    {...register("fullName", {})}
                                    sx={{ width: "100%" }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "33%" }, // Full width on mobile, 45% on desktop
                                }}
                            >
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Specialization
                                </Typography>
                                <DropdownBox
                                    label="Select your specialization"
                                    name="specialization"
                                    register={register}
                                    setValue={setValue}
                                    options={[]} // Fill it from the backend
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "33%" }, // Full width on mobile, 45% on desktop
                                }}
                            >
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Career Level
                                </Typography>
                                <DropdownBox
                                    label="Select your career level"
                                    name="career"
                                    register={register}
                                    setValue={setValue}
                                    options={[]} // Fill it from the backend
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on desktop
                                gap: 2, // Consistent spacing between items
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "33%" }, // Full width on mobile, 45% on desktop
                                }}
                            >
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Select Date
                                </Typography>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Choose date"
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            setSelectedDate(newValue);
                                            setValue(
                                                "appointmentDate",
                                                newValue
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={!!errors.appointmentDate}
                                                helperText={
                                                    errors.appointmentDate
                                                        ?.message
                                                }
                                            />
                                        )}
                                        minDate={dayjs()} // Prevent selecting past dates
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "33%" }, // Full width on mobile, 45% on desktop
                                }}
                            >
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Select Time
                                </Typography>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <TimePicker
                                        label="Choose time"
                                        value={selectedTime}
                                        onChange={(newValue) => {
                                            setSelectedTime(newValue);
                                            setValue(
                                                "appointmentTime",
                                                newValue
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={!!errors.appointmentTime}
                                                helperText={
                                                    errors.appointmentTime
                                                        ?.message
                                                }
                                            />
                                        )}
                                        minTime={
                                            selectedDate &&
                                            dayjs(selectedDate).isSame(
                                                dayjs(),
                                                "day"
                                            )
                                                ? dayjs()
                                                : null
                                        }
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "33%" }, // Full width on mobile, 45% on desktop
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 4,
                                        width: "100%",
                                        py: 1.5,
                                        fontSize: "1.1rem",
                                        textTransform: "none",
                                        bgcolor: "#33b4d4",
                                        "&:hover": { bgcolor: "#2c3e50" },
                                    }}
                                >
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </form>
            {/* End of search  ****************** */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // overflow: "scroll"
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        height: 500,
                        maxWidth: {xs: 400,sm: 600,  md:1200},
                        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={rowCount} // Total row count from backend
                        paginationMode="server" // Enable server-side pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        disableColumnResize
                        sx={{
                            "& .MuiDataGrid-cell": {
                                borderBottom:
                                    "1px solid rgba(224, 224, 224, 0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "&:focus": {
                                    outline: "none",
                                },
                            },
                            "& .header": {
                                backgroundColor: "#33b4d4",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                px: 2,
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "rgba(63, 81, 181, 0.08)",
                            },
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                                {
                                    margin: 0,
                                },
                            "& .MuiDataGrid-columnHeader": {
                                display: "flex",
                                justifyContent: "center",
                                // Header separator styling
                                "& .MuiDataGrid-columnSeparator": {
                                    width: "2px",
                                    background: "rgba(255, 255, 255, 0.6)", // Light white separator
                                },
                            },
                        }}
                    />
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default Appointment;
