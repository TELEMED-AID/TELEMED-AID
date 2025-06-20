import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to get state from Redux
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
    LinearProgress, // Add this import
    Alert,
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

// Assume these paths are correct relative to your ProfilePage.js
import RoomCreationPopup from "../../Pages/RoomCreationPopup/RoomCreationPopup ";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import useGet from "../../Hooks/useGet"; // Import your custom useGet hook

const ProfilePage = () => {
    // State for the room creation popup
    const [roomPopupOpen, setRoomPopupOpen] = useState(false);
    // Hook for navigation
    const navigate = useNavigate();

    // Get user role and ID from Redux store using useSelector
    // This assumes your Redux store has a 'user' slice with 'userId', 'role', and 'isLogged'
    const { userId, role, isLogged } = useSelector((state) => state.user);
    console.log("Initial User State:", { userId, role, isLogged });
    // State to store the fetched user data
    const [fetchedUserData, setFetchedUserData] = useState(null);
    // Initialize your custom useGet hook
    const { loading, getItem } = useGet();

    // Determine if the current user is a doctor based on Redux role
    const isDoctor = role === "DOCTOR";
    useEffect(() => {
        console.log("User State after rehydration/update:", {
            userId,
            role,
            isLogged,
        });
        // Your data fetching logic can safely go here as well,
        // as it will run after the state is available.
        // ... (rest of your fetchUserData logic)
    }, [userId, role, isLogged]); // Dependency array
    // useEffect hook to fetch user data when component mounts or user details change
    useEffect(() => {
        const fetchUserData = async () => {
            // Only attempt to fetch if the user is logged in, has a userId, and a role
            if (isLogged && userId && role) {
                let endpoint = "";
                // Construct the API endpoint based on the user's role
                if (role === "PATIENT") {
                    // Endpoint for fetching patient data
                    endpoint = `/api/patient/get-patient/${userId}`;
                } else if (role === "DOCTOR") {
                    // Endpoint for fetching doctor data (assuming a similar structure)
                    endpoint = `/api/doctor/get/doctor/${userId}`;
                }

                // If an endpoint is determined, call getItem from useGet
                if (endpoint) {
                    await getItem(
                        endpoint,
                        false, // Set snackbar to false for initial fetch, as loading state is handled below
                        (response) => {
                            // On successful fetch, update the fetchedUserData state
                            setFetchedUserData(response);
                        },
                        () => {
                            // On error, clear the fetchedUserData
                            setFetchedUserData(null);
                        }
                    );
                }
            } else {
                // If not logged in or missing necessary Redux user details, clear any existing data
                setFetchedUserData(null);
            }
        };

        // Call the data fetching function
        fetchUserData();
    }, []); // Dependency array: re-run effect if these values change

    // Use fetchedUserData for display. If it's still null (e.g., loading or error), use an empty object
    // to prevent errors when accessing properties.
    const userDataToDisplay = fetchedUserData || {};

    // Format birth date, handling the case where it might not be loaded yet
    const formattedBirthDate = userDataToDisplay.birthDate
        ? new Date(userDataToDisplay.birthDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "N/A";

    // Handler for navigation buttons
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

    // Mock users data for room creation (kept as is, not affected by profile data fetch)
    const mockUsers = [
        { id: 1, name: "Dr. Smith", role: "Doctor" },
        { id: 2, name: "Dr. Johnson", role: "Doctor" },
        { id: 3, name: "Patient Alice", role: "Patient" },
        { id: 4, name: "Patient Bob", role: "Patient" },
    ];

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    maxWidth: { xs: 350, md: 1200 },
                    margin: "0 auto",
                    mt: 3,
                    px: 2, // Added horizontal padding for better mobile viewing
                }}
            >
                <Grid container spacing={2}>
                    {" "}
                    {/* Increased spacing for better layout */}
                    {/* Left Column - Actions */}
                    <Grid>
                        <Card elevation={2} sx={{ mb: 2 }}>
                            {" "}
                            {/* Added margin-bottom */}
                            <CardContent>
                                <List>
                                    <ListItem
                                        onClick={() =>
                                            handleButtonClick("account")
                                        }
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
                                    backgroundColor: "grey",
                                    height: 2,
                                }}
                            />
                        </Card>
                    </Grid>
                    {/* Right Column - Profile Info */}
                    <Grid>
                        {/* Adjust grid size for proper display */}
                        <Paper
                            elevation={3}
                            sx={{
                                pt: 3,
                                pb: 2, // Added padding bottom
                                // px: 5, // Added horizontal padding
                                width: {xs:"auto", md: "500px"},
                            }}
                        >
                            {loading ? (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                >
                                    <Box
                                        position="relative"
                                        width={100}
                                        height={100}
                                        mb={3}
                                    >
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {isDoctor
                                            ? "Loading Doctor Profile"
                                            : "Loading Patient Profile"}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        Gathering your health information...
                                    </Typography>
                                    <LinearProgress
                                        color="secondary"
                                        sx={{
                                            height: 6,
                                            width: "50%",
                                            borderRadius: 3,
                                            background: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? "rgba(0, 0, 0, 0.1)"
                                                    : "rgba(255, 255, 255, 0.1)",
                                        }}
                                    />
                                </Box>
                            ) : fetchedUserData ? (
                                <>
                                    <Box sx={{ mb: 2 }}>
                                        {" "}
                                        {/* Added margin-bottom */}
                                        <Typography variant="h6" gutterBottom>
                                            {isDoctor
                                                ? "Doctor ID"
                                                : "Patient ID"}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                mb: 2,
                                                color: "text.secondary",
                                            }}
                                        >
                                            {userDataToDisplay.userId || "N/A"}{" "}
                                            {/* Use fetched userId */}
                                        </Typography>
                                        {/* Create Room Button (for both roles, or conditional if needed) */}
                                        <Button
                                            variant="contained"
                                            startIcon={<PostAdd />}
                                            onClick={() =>
                                                setRoomPopupOpen(true)
                                            }
                                            sx={{
                                                bgcolor: "#c2185b",
                                                "&:hover": {
                                                    bgcolor: "#a31545", // Darker hover color
                                                },
                                                mr: 1, // Margin right for spacing between buttons
                                                mb: 2,
                                            }}
                                        >
                                            Create Room
                                        </Button>
                                        {/* Chat Room Button */}
                                        <Button
                                            variant="contained"
                                            startIcon={<Schedule />}
                                            onClick={() =>
                                                handleButtonClick("chat")
                                            }
                                            sx={{
                                                bgcolor: "#33b4d4",
                                                "&:hover": {
                                                    bgcolor: "#2a9cb3",
                                                },
                                                mb: 2,
                                            }}
                                        >
                                            Chat Room
                                        </Button>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />{" "}
                                    {/* Divider below buttons */}
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Person />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Legal Name"
                                                secondary={
                                                    userDataToDisplay.name ||
                                                    "N/A"
                                                }
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
                                                secondary={
                                                    userDataToDisplay.phone ||
                                                    "N/A"
                                                }
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <Transgender />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Gender"
                                                secondary={
                                                    userDataToDisplay.gender ||
                                                    "N/A"
                                                }
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <Public />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Country"
                                                secondary={`${
                                                    userDataToDisplay.countryName ||
                                                    "N/A"
                                                } (${
                                                    userDataToDisplay.countryId ||
                                                    "N/A"
                                                })`}
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
                                                        secondary={
                                                            userDataToDisplay.careerLevel ||
                                                            "N/A"
                                                        }
                                                    />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemIcon>
                                                        <MedicalServices />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="Specialization"
                                                        secondary={
                                                            userDataToDisplay.specialization ||
                                                            "N/A"
                                                        }
                                                    />
                                                </ListItem>
                                            </>
                                        )}
                                    </List>
                                    <Box
                                        sx={{
                                            mt: 3, // Increased margin top
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 2,
                                            justifyContent: {
                                                xs: "center",
                                                md: "flex-start",
                                            }, // Center buttons on small screens
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<Edit />}
                                            onClick={() =>
                                                handleButtonClick(
                                                    "update-profile"
                                                )
                                            }
                                            sx={{
                                                bgcolor: "#33b4d4",
                                                "&:hover": {
                                                    bgcolor: "#2a9cb3",
                                                },
                                                minWidth: "180px", // Ensure consistent button width
                                            }}
                                        >
                                            Update Profile
                                        </Button>

                                        <Button
                                            variant="contained"
                                            startIcon={<CalendarToday />}
                                            onClick={() =>
                                                handleButtonClick(
                                                    "appointments"
                                                )
                                            }
                                            sx={{
                                                bgcolor: "#33b4d4",
                                                "&:hover": {
                                                    bgcolor: "#2a9cb3",
                                                },
                                                minWidth: "180px",
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
                                                        handleButtonClick(
                                                            "create-article"
                                                        )
                                                    }
                                                    sx={{
                                                        bgcolor: "#33b4d4",
                                                        "&:hover": {
                                                            bgcolor: "#2a9cb3",
                                                        },
                                                        minWidth: "180px",
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
                                                        minWidth: "180px",
                                                    }}
                                                >
                                                    Set Availability
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                </>
                            ) : (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    // height="200px"
                                    sx={{
                                        mt: {xs: "auto", md:"150px"}
                                    }}
                                    
                                >
                                
                                    <Alert severity="error" sx={{
                                        width: "500px",
                                        textAlign: "center"
                                    }} >
                                        Failed to load profile data or not
                                        logged in.
                                    </Alert>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                <RoomCreationPopup
                    open={roomPopupOpen}
                    onClose={() => setRoomPopupOpen(false)}
                    users={mockUsers}
                />
            </Box>
            <Footer />
        </>
    );
};

export default ProfilePage;
