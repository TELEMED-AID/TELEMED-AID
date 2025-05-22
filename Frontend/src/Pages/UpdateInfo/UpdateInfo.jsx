import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchableDropDown from "../../Components/DropDown/SearchableDropDown"; // Adjust path as needed
import Navbar from "../../Components/Navbar/Navbar"; // Adjust path as needed

const UpdateInfo = ({ role }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        specialization: "",
        careerLevel: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/doctor/getDoctor");
                const userData = response.data;

                setFormData({
                    name: userData.name || "",
                    phone: userData.phone || "",
                    specialization: userData.specialization || "",
                    careerLevel: userData.careerLevel || "",
                });
                setLoading(false);
            } catch (err) {
                setError("Failed to load user data");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Custom handler for dropdown changes
    const handleDropdownChange = (fieldName, value) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const updateData = {
                name: formData.name,
                phone: formData.phone,
                ...(role === "doctor" && {
                    specialization: formData.specialization,
                    careerLevel: formData.careerLevel,
                }),
            };

            await axios.put("/api/user/update", updateData);
            setSuccess(true);
            setTimeout(() => navigate("/profile"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={2} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Update {role === "doctor" ? "Doctor" : "Patient"}{" "}
                        Information
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Information updated successfully!
                        </Alert>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            }, // Stack on mobile, row on desktop
                            // gap: 2, // Consistent spacing between items
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "48%" }, // Full width on mobile, 45% on desktop
                            }}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "48%" }, // Full width on mobile, 45% on desktop
                            }}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>

                    {/* Doctor-Specific Fields */}
                    {role === "doctor" && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    }, // Stack on mobile, row on desktop
                                    gap: 3, // Consistent spacing between items
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: "100%", sm: "48%" }, // Full width on mobile, 45% on desktop
                                    }}
                                >
                                    <SearchableDropDown
                                        placeholder="Select your specialization"
                                        name="specialization"
                                        items={[
                                            { name: "test1" },
                                            { name: "test3" },
                                        ]}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: { xs: "100%", sm: "48%" }, // Full width on mobile, 45% on desktop
                                    }}
                                >
                                    <SearchableDropDown
                                        placeholder="Select your career level"
                                        name="careerlevel"
                                        items={[
                                            { name: "test1" },
                                            { name: "test3" },
                                        ]}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}

                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate("/update-password")}
                            sx={{
                                color: "white",
                                bgcolor: "#c2185b",
                                "&:hover": {
                                    borderColor: "#2a96b3",
                                },
                            }}
                        >
                            Update Password
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#33b4d4",
                                "&:hover": { backgroundColor: "#2a96b3" },
                            }}
                        >
                            Update Information
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default UpdateInfo;
