import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
    Chip,
    Box,
    Typography,
    Divider,
    IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const generateRandomRoomName = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `Room_${randomString}`;
};
const RoomCreationPopup = ({ open, onClose, users, onCreateRoom }) => {
    const [roomName, setRoomName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Regenerate room name when dialog opens
    useEffect(() => {
        if (open) {
            setRoomName(generateRandomRoomName());
            setSelectedUsers([]); // Reset selections when reopening
        }
    }, [open]);

    const handleRefreshName = () => {
        setRoomName(generateRandomRoomName());
    };

    // Mock user data - in a real app this would come from props/backend
    const mockUsers = users || [
        { id: 1, name: "Dr. Smith", role: "Doctor" },
        { id: 2, name: "Dr. Johnson", role: "Doctor" },
        { id: 3, name: "Patient Alice", role: "Patient" },
        { id: 4, name: "Patient Bob", role: "Patient" },
        { id: 5, name: "Dr. Williams", role: "Doctor" },
    ];

    const handleCreateRoom = () => {
        if (typeof onCreateRoom === "function") {
            onCreateRoom(roomName, selectedUsers);
        }
        onClose();
    };

    const toggleUserSelection = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const filteredUsers = mockUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="sm"
                disableRestoreFocus // Add this to prevent focus issues
            >
                <DialogTitle>Create New Chat Room</DialogTitle>

                <DialogContent dividers>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Room Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <IconButton
                            onClick={handleRefreshName}
                            aria-label="refresh room name"
                            sx={{ mb: 3 }}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Box>

                    <TextField
                        margin="dense"
                        label="Search Users"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="subtitle1" gutterBottom>
                        Select Participants ({selectedUsers.length} selected)
                    </Typography>

                    {selectedUsers.length > 0 && (
                        <Box
                            sx={{
                                mb: 2,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                            }}
                        >
                            {selectedUsers.map((userId) => {
                                const user = mockUsers.find(
                                    (u) => u.id === userId
                                );
                                return (
                                    <Chip
                                        key={userId}
                                        label={user?.name}
                                        onDelete={() =>
                                            toggleUserSelection(userId)
                                        }
                                    />
                                );
                            })}
                        </Box>
                    )}

                    <Divider sx={{ my: 1 }} />

                    <List sx={{ maxHeight: 300, overflow: "auto" }}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <ListItem key={user.id}>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={user.role}
                                    />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            edge="end"
                                            checked={selectedUsers.includes(
                                                user.id
                                            )}
                                            onChange={() =>
                                                toggleUserSelection(user.id)
                                            }
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No users found" />
                            </ListItem>
                        )}
                    </List>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="white"
                        onClick={onClose}
                        sx={{
                            fontSize: "1.1rem",
                            textTransform: "none",
                            bgcolor: "#c2185b",
                            "&:hover": { bgcolor: "#880e4f" },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateRoom}
                        variant="contained"
                        disabled={!roomName || selectedUsers.length === 0}
                        sx={{
                            fontSize: "1.1rem",
                            textTransform: "none",
                            bgcolor: "#33b4d4",
                            "&:hover": { bgcolor: "#2a9cb3" },
                        }}
                    >
                        Create Room
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RoomCreationPopup;
