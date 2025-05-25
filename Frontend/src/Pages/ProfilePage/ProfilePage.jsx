import React from "react";
import { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
} from "@mui/material";
import {
    Edit,
    CalendarToday,
    PostAdd,
    Article,
    Schedule,
    Room,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import RoomCreationPopup from "../../Pages/RoomCreationPopup/RoomCreationPopup "; // Update with your actual path
const ProfilePage = ({ userRole = "PATIENT" }) => {
    const [roomPopupOpen, setRoomPopupOpen] = useState(false);
    // Default to patient if not specified
    // Your actual data
    const navigate = useNavigate();
    const userData = {
        name: "Mohamed Aly",
        birthDate: "2001-05-21",
        primaryEmail: "malyhas2020@gmail.com",
        secondaryEmail: "",
        phone: "201551616660",
        notifications: "SMS",
        address: "Khalil ElKhiat Street No Alexandia, Alexandria EG 21523",
        userId: "681b764b4ceda05bd9dcd335",
    };

    const isDoctor = userRole === "DOCTOR";
    const formattedBirthDate = new Date(userData.birthDate).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
    // Mock users data to pass to RoomCreationPopup
    const mockUsers = [
        { id: 1, name: "Dr. Smith", role: "Doctor" },
        { id: 2, name: "Dr. Johnson", role: "Doctor" },
        { id: 3, name: "Patient Alice", role: "Patient" },
        { id: 4, name: "Patient Bob", role: "Patient" },
        { id: 5, name: "Dr. Williams", role: "Doctor" },
    ];
    const handleButtonClick = (action) => {
        switch (action) {
            case "update-profile":
                navigate("/update-info");
                break;
            case "appointments":
                navigate("/my-appointments");
                break;
            case "room-creation":
                navigate("/room-creation");
                break;
            case "create-article":
                navigate("/create-article");
                break;
            case "set-availability":
                navigate("/availability");
                break;
            default:
                console.log(`Action: ${action}`);
        }
    };
    return (
        <Box sx={{ maxWidth: { xs: 400, md: 1200 }, margin: "0 auto" }}>
            <Grid container spacing={4}>
                {/* Left Column - Actions */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3}>
                        <CardContent>
                            <List>
                                <ListItem
                                    button
                                    onClick={() => handleButtonClick("account")}
                                >
                                    <ListItemText
                                        primary="My Account"
                                        secondary="Manage your account information"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                        <Divider
                            sx={{
                                p: 0,
                                m: 0,
                                backgroundColor: "grey", // Matching your button color
                                height: 2, // Makes it slightly thicker
                            }}
                        />
                    </Card>
                </Grid>

                {/* Right Column - Profile Info */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Box sx={{ mb: 1, pl: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {isDoctor ? "Doctor ID" : "User ID"}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ mb: 2, color: "text.secondary" }}
                            >
                                {userData.userId}
                            </Typography>
                        </Box>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Legal Name"
                                    secondary={userData.name}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Date of Birth"
                                    secondary={formattedBirthDate}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Primary Email"
                                    secondary={userData.primaryEmail}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Secondary Email"
                                    secondary={
                                        userData.secondaryEmail ||
                                        "Not provided"
                                    }
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Phone Number"
                                    secondary={userData.phone}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Notifications"
                                    secondary={userData.notifications}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Address"
                                    secondary={userData.address}
                                />
                            </ListItem>
                        </List>

                        <Box
                            sx={{
                                mt: 1,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() =>
                                    handleButtonClick("update-profile")
                                }
                                sx={{
                                    bgcolor: "#33b4d4",
                                    "&:hover": { bgcolor: "#2a9cb3" },
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                Update Profile
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<CalendarToday />}
                                onClick={() =>
                                    handleButtonClick("appointments")
                                }
                                sx={{
                                    bgcolor: "#33b4d4",
                                    "&:hover": { bgcolor: "#2a9cb3" },
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                My Appointments
                            </Button>
                            {/* Replaced Post Question with Create Room */}
                            <Button
                                variant="contained"
                                startIcon={<PostAdd />}
                                onClick={() => setRoomPopupOpen(true)}
                                sx={{
                                    bgcolor: "#33b4d4",
                                    "&:hover": { bgcolor: "#2a9cb3" },
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                Create Room
                            </Button>
                            {isDoctor && (
                                <>
                                    <Button
                                        variant="contained"
                                        startIcon={<Article />}
                                        onClick={() =>
                                            handleButtonClick("create-article")
                                        }
                                        sx={{
                                            bgcolor: "#33b4d4",
                                            "&:hover": { bgcolor: "#2a9cb3" },
                                            mx: "auto",
                                            mb: 2,
                                        }}
                                    >
                                        Create Article
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Schedule />}
                                        onClick={() =>
                                            handleButtonClick(
                                                "set-availability"
                                            )
                                        }
                                        sx={{
                                            bgcolor: "#33b4d4",
                                            "&:hover": { bgcolor: "#2a9cb3" },
                                            mx: "auto",
                                            mb: 2,
                                        }}
                                    >
                                        Set Availability
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {/* Room Creation Popup */}
            <RoomCreationPopup
                open={roomPopupOpen}
                onClose={() => setRoomPopupOpen(false)}
                users={mockUsers}
            />
        </Box>
    );
};

export default ProfilePage;
