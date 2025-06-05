import React, { useState } from "react";
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
    ListItemIcon,
} from "@mui/material";
import {
    Edit,
    CalendarToday,
    PostAdd,
    Article,
    Schedule,
    Public,
    Transgender,
    Work,
    MedicalServices,
    Cake,
    Phone,
    Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import RoomCreationPopup from "../../Pages/RoomCreationPopup/RoomCreationPopup ";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import backgroundImage from "../../Assets/profile-background.png";

const ProfilePage = ({ userRole = "PATIENT" }) => {
    const [roomPopupOpen, setRoomPopupOpen] = useState(false);
    const navigate = useNavigate();

    // Sample data - in a real app this would come from API
    const patientData = {
        userId: "681b764b4ceda05bd9dcd335",
        name: "Mohamed Aly",
        countryName: "Egypt",
        countryId: "EG",
        gender: "Male",
        phone: "201551616660",
        birthDate: "2001-05-21",
    };

    const doctorData = {
        userId: "doc_123456789",
        name: "Dr. Smith",
        phone: "201551616660",
        birthDate: "1980-03-15",
        gender: "Male",
        countryName: "United States",
        countryId: "US",
        careerLevel: "Senior Specialist",
        specialization: "Cardiology",
    };

    const isDoctor = userRole === "DOCTOR";
    const userData = isDoctor ? doctorData : patientData;
    const formattedBirthDate = new Date(userData.birthDate).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    // Mock users data for room creation
    const mockUsers = [
        { id: 1, name: "Dr. Smith", role: "Doctor" },
        { id: 2, name: "Dr. Johnson", role: "Doctor" },
        { id: 3, name: "Alice", role: "Doctor" },
        { id: 4, name: "Bob", role: "Doctor" },
    ];

    const handleButtonClick = (action) => {
        switch (action) {
            case "update-profile":
                navigate("/update-info");
                break;
            case "appointments":
                navigate("/my-appointments");
                break;
            case "create-article":
                navigate("/AddArticle");
                break;
            case "set-availability":
                navigate("/availability");
                break;
            case "chat":
                navigate("/chat");
                break;
            default:
                console.log(`Action: ${action}`);
        }
    };

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    maxWidth: { xs: 350, md: 1200 },
                    margin: "0 auto",
                    mt: 3,
                }}
            >
                <Grid container spacing={1}>
                    {/* Left Column - Actions */}
                    <Grid>
                        <Card elevation={2}>
                            <CardContent>
                                <List>
                                    <ListItem>
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
                                    backgroundColor: "grey",
                                    height: 2,
                                }}
                            />
                        </Card>
                    </Grid>

                    {/* Right Column - Profile Info */}
                    <Paper
                        elevation={3}
                        sx={{
                            pt: 3,
                        }}
                    >
                        <Box sx={{ pl: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {isDoctor ? "Doctor ID" : "Patient ID"}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ mb: 2, color: "text.secondary" }}
                            >
                                {userData.userId}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<PostAdd />}
                                onClick={() => setRoomPopupOpen(true)}
                                sx={{
                                    bgcolor: "#c2185b",
                                    "&:hover": {
                                        borderColor: "#2a96b3",
                                    },
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                Create Room
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Schedule />}
                                onClick={() => handleButtonClick("chat")}
                                sx={{
                                    bgcolor: "#33b4d4",
                                    "&:hover": {
                                        bgcolor: "#2a9cb3",
                                    },
                                    mx: "5px",
                                    mb: 2,
                                }}
                            >
                                Chat Room
                            </Button>
                        </Box>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Legal Name"
                                    secondary={userData.name}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <Cake />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Date of Birth"
                                    secondary={formattedBirthDate}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <Phone />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Phone Number"
                                    secondary={userData.phone}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <Transgender />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Gender"
                                    secondary={userData.gender}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <Public />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Country"
                                    secondary={`${userData.countryName} (${userData.countryId})`}
                                />
                            </ListItem>

                            {isDoctor && (
                                <>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Work />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Career Level"
                                            secondary={userData.careerLevel}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon>
                                            <MedicalServices />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Specialization"
                                            secondary={userData.specialization}
                                        />
                                    </ListItem>
                                </>
                            )}
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
                                            "&:hover": {
                                                bgcolor: "#2a9cb3",
                                            },
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
                                            "&:hover": {
                                                bgcolor: "#2a9cb3",
                                            },
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

                <RoomCreationPopup
                    open={roomPopupOpen}
                    onClose={() => setRoomPopupOpen(false)}
                    users={mockUsers}
                    onCreateRoom={(roomName, selectedUserIds) => {
                        const selectedDoctors = mockUsers
                            .filter(
                                (user) =>
                                    selectedUserIds.includes(user.id) &&
                                    user.role === "Doctor"
                            )
                            .map((user) => ({
                                id: user.id,
                                name: user.name,
                            }));

                        const requestData = {
                            roomName,
                            participants: selectedDoctors,
                        };

                        // Print the request data to console
                        console.log("Request data to backend:", requestData);

                        // Optional: Close popup
                        setRoomPopupOpen(false);

                        // Optional: handleRoomSelect / UI logic can stay or be removed for now
                        // handleRoomSelect(newRoom.id);
                    }}
                />
            </Box>
            <Footer />
        </>
    );
};

export default ProfilePage;
