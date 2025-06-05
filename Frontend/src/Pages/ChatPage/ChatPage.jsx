import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    TextField,
    IconButton,
    Paper,
    Badge,
    Drawer,
    useMediaQuery,
    useTheme,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    InputAdornment,
} from "@mui/material";
import RoomCreationPopup from "../../Pages/RoomCreationPopup/RoomCreationPopup ";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useParams, useNavigate } from "react-router-dom";
import chatWallpaper from "../../Assets/chatwallpaper.jpg";

//request to get all the rooms created
const mockRooms = [
    {
        id: "1",
        name: "General Discussion",
        lastMessage: "Hello everyone!",
        unreadCount: 2,
        participants: ["Dr. Smith", "Patient Alice", "You"],
    },
    {
        id: "2",
        name: "Medical Consultation",
        lastMessage: "About your test results...",
        unreadCount: 0,
        participants: ["Dr. Johnson", "You"],
    },
    {
        id: "3",
        name: "Room_dfh703fphrwnf8",
        lastMessage:
            "The meeting is at 3 PM today. I want every one to be here",
        unreadCount: 5,
        participants: ["Dr. Williams", "Patient Bob", "You"],
    },
];

// request to get all messages in a given room id
const mockMessages = {
    1: [
        {
            id: "1",
            sender: "Dr. Smith",
            text: "Hello everyone!",
            time: "10:30 AM",
        },
        {
            id: "2",
            sender: "You",
            text: "Hi Dr. Smith! I have a question about my medication.",
            time: "10:31 AM",
        },
        {
            id: "3",
            sender: "Dr. Smith",
            text: "Sure, go ahead.",
            time: "10:32 AM",
        },
        {
            id: "4",
            sender: "You",
            text: "Is it safe to take my antibiotics with painkillers?",
            time: "10:33 AM",
        },
    ],
    2: [
        {
            id: "1",
            sender: "Dr. Johnson",
            text: "About your test results...",
            time: "Yesterday",
        },
        {
            id: "2",
            sender: "You",
            text: "Yes, doctor. I've been anxious to know.",
            time: "Yesterday",
        },
        {
            id: "3",
            sender: "Dr. Johnson",
            text: "No worries. Everything looks fine. Just a slight deficiency in Vitamin D.",
            time: "Yesterday",
        },
        {
            id: "4",
            sender: "You",
            text: "That's a relief. Should I take supplements?",
            time: "Yesterday",
        },
        {
            id: "5",
            sender: "Dr. Johnson",
            text: "Yes, and try to get some sunlight daily.",
            time: "Yesterday",
        },
    ],
    3: [
        {
            id: "1",
            sender: "Dr. Williams",
            text: "The meeting is at 3 PM today. I want every one to be here",
            time: "Monday",
        },
        { id: "2", sender: "You", text: "Got it, thanks!", time: "Monday" },
        {
            id: "3",
            sender: "Dr. Williams",
            text: "Don't forget to bring the updated report.",
            time: "Monday",
        },
        {
            id: "4",
            sender: "You",
            text: "Already prepared it. Will share it during the meeting.",
            time: "Monday",
        },
        {
            id: "5",
            sender: "Dr. Williams",
            text: "Excellent. See you later.",
            time: "Monday",
        },
    ],
};

// request to get all doctors (name, id)
const availableUsers = [
    "Dr. Brown",
    "Nurse Jane",
    "Patient Carol",
    "Dr. Miller",
    "Patient Dave",
];
// request to get all doctors (name, id)
const mockUsers = [
    { id: 1, name: "Dr. Smith", role: "Doctor" },
    { id: 2, name: "Dr. Johnson", role: "Doctor" },
    { id: 3, name: "Dr. Alice", role: "Doctor" },
    { id: 4, name: "Dr. Bob", role: "Doctor" },
];
const ChatPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [currentRoom, setCurrentRoom] = useState(roomId || "1");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showCreateRoomDialog, setShowCreateRoomDialog] = useState(false);
    const [showAddParticipantsDialog, setShowAddParticipantsDialog] =
        useState(false);
    const [newRoomName, setNewRoomName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const [roomPopupOpen, setRoomPopupOpen] = useState(false);
    useEffect(() => {
        setMessages(mockMessages[currentRoom] || []);
    }, [currentRoom]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                sender: "You",
                text: message,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    };

    const handleRoomSelect = (roomId) => {
        setCurrentRoom(roomId);
        if (isMobile) setDrawerOpen(false);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleCreateRoom = () => {
        if (newRoomName.trim()) {
            // In a real app, you would send this to your backend
            const newRoom = {
                id: Date.now().toString(),
                name: newRoomName,
                lastMessage: "Room created",
                unreadCount: 0,
                participants: ["You"],
            };
            mockRooms.push(newRoom);
            setNewRoomName("");
            setShowCreateRoomDialog(false);
            handleRoomSelect(newRoom.id);
        }
    };

    const handleAddParticipant = (user) => {
        if (!selectedUsers.includes(user)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleRemoveParticipant = (userToRemove) => {
        setSelectedUsers(selectedUsers.filter((user) => user !== userToRemove));
    };

    // Adjust this kareem to send the request with room id and new participants of the specified room ***********************
    const handleInviteParticipants = () => {
        // Get the current room
        const room = mockRooms.find((r) => r.id === currentRoom);

        if (room) {
            // Prepare the request data
            const requestData = {
                roomId: currentRoom,
                participants: selectedUsers,
            };

            // Print the request data to console
            console.log("Request to add participants:", requestData);

            // In a real app, you would send this to your backend:
            // axios.post(`/api/rooms/${currentRoom}/participants`, requestData)
            //   .then(response => {
            //     // Update local state if needed
            //     setSelectedUsers([]);
            //     setShowAddParticipantsDialog(false);
            //   });

            // For now, just update mock data and close dialog
            room.participants = [
                ...new Set([...room.participants, ...selectedUsers]),
            ];
            setSelectedUsers([]);
            setShowAddParticipantsDialog(false);
        }
    };

    return (
        <Box
            sx={{
                height: { xs: "calc(100vh - 55px)", md: "100%" },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                overflow: "hidden",
            }}
        >
            {/* Mobile Header */}
            {isMobile && (
                <Paper
                    elevation={3}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        flexShrink: 0,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => navigate("/profile")}
                            sx={{ mr: 1 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {mockRooms.find((r) => r.id === currentRoom)?.name ||
                            "Chat"}
                    </Typography>
                </Paper>
            )}

            {/* Rooms List - Drawer for mobile, Sidebar for desktop */}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? drawerOpen : true}
                onClose={toggleDrawer}
                sx={{
                    width: isMobile ? "280px" : "400px",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: isMobile ? "280px" : "400px",
                        boxSizing: "border-box",
                        position: "relative",
                        height: isMobile ? "100%" : "100vh",
                    },
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        borderBottom: "1px solid rgba(0,0,0,0.12)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">Chat Rooms</Typography>
                    <IconButton onClick={() => navigate("/profile")}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<GroupAddIcon />}
                        onClick={() => setRoomPopupOpen(true)}
                        sx={{
                            mb: 2,
                            bgcolor: "#ad1457",
                            "&:hover": { bgcolor: "#880e4f" },
                        }}
                    >
                        Create Room
                    </Button>
                </Box>
                <List sx={{ overflow: "auto" }}>
                    {mockRooms.map((room) => (
                        <React.Fragment key={room.id}>
                            <ListItem
                                selected={currentRoom === room.id}
                                onClick={() => handleRoomSelect(room.id)}
                                sx={{
                                    py: 1.5,
                                    "&.Mui-selected": {
                                        backgroundColor:
                                            "rgba(51, 180, 212, 0.12)",
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: "#c2185b" }}>
                                        {room.name.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography
                                                fontWeight={
                                                    currentRoom === room.id
                                                        ? "bold"
                                                        : "normal"
                                                }
                                            >
                                                {room.name}
                                            </Typography>
                                            {room.unreadCount > 0 && (
                                                <Badge
                                                    badgeContent={
                                                        room.unreadCount
                                                    }
                                                    sx={{
                                                        "& .MuiBadge-badge": {
                                                            backgroundColor:
                                                                "#33b4d4",
                                                            color: "#ffffff",
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    }
                                    secondary={
                                        <Typography
                                            // noWrap
                                            sx={{
                                                color:
                                                    currentRoom === room.id
                                                        ? "text.primary"
                                                        : "text.secondary",
                                                fontWeight:
                                                    currentRoom === room.id
                                                        ? "bold"
                                                        : "normal",
                                            }}
                                        >
                                            {room.lastMessage}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            {/* Chat Area */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "100%", md: "calc(100% - 300px)" },
                    height: isMobile ? "calc(100vh - 56px)" : "100vh", // Subtract mobile header height
                    overflow: "hidden", // Prevent nested scrolling
                }}
            >
                {currentRoom ? (
                    <>
                        {/* Chat Header - Visible on desktop only */}
                        {!isMobile && (
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    flexShrink: 0,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography variant="h6">
                                        {
                                            mockRooms.find(
                                                (r) => r.id === currentRoom
                                            )?.name
                                        }
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Participants:{" "}
                                        {mockRooms
                                            .find((r) => r.id === currentRoom)
                                            ?.participants.join(", ")}
                                    </Typography>
                                </Box>
                                <IconButton
                                    sx={{ color: "#ad1457", mr: "20px" }}
                                    onClick={() =>
                                        setShowAddParticipantsDialog(true)
                                    }
                                    title="Add participants"
                                >
                                    <PersonAddIcon />
                                </IconButton>
                            </Paper>
                        )}

                        {/* Messages Container */}
                        <Box
                            ref={messagesContainerRef}
                            sx={{
                                flex: 1,
                                overflow: "auto",
                                py: 2,
                                px: 5,
                                backgroundImage: `
                                    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
                                    url(${chatWallpaper})
                                    `,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundAttachment: "fixed",
                            }}
                        >
                            {messages.map((msg) => (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            msg.sender === "You"
                                                ? "flex-end"
                                                : "flex-start",
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: {
                                                xs: "90%",
                                                sm: "80%",
                                                md: "70%",
                                            },
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor:
                                                msg.sender === "You"
                                                    ? "#33b4d4"
                                                    : "background.paper",
                                            color:
                                                msg.sender === "You"
                                                    ? "#ffffff"
                                                    : "text.primary",
                                            boxShadow: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {msg.sender}
                                        </Typography>
                                        <Typography variant="body1">
                                            {msg.text}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "block",
                                                textAlign: "right",
                                                color:
                                                    msg.sender === "You"
                                                        ? "rgba(255,255,255,0.7)"
                                                        : "text.secondary",
                                            }}
                                        >
                                            {msg.time}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                            <div ref={messagesEndRef} />
                        </Box>

                        {/* Message Input */}
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSendMessage()
                                    }
                                    sx={{ mr: 1 }}
                                    InputProps={{
                                        startAdornment: isMobile && (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        setShowAddParticipantsDialog(
                                                            true
                                                        )
                                                    }
                                                    title="Add participants"
                                                >
                                                    <PersonAddIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <IconButton
                                    color="primary"
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </>
                ) : (
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "background.default",
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Select a room to start chatting
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Create Room Dialog */}
            <Dialog
                open={showCreateRoomDialog}
                onClose={() => setShowCreateRoomDialog(false)}
            >
                <DialogTitle>Create New Room</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Room Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCreateRoomDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateRoom} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Participants Dialog */}
            <Dialog
                disableRestoreFocus // Add this line
                open={showAddParticipantsDialog}
                onClose={() => setShowAddParticipantsDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add Participants</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Selected Participants
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedUsers.length > 0 ? (
                                selectedUsers.map((user) => (
                                    <Chip
                                        key={user}
                                        label={user}
                                        onDelete={() =>
                                            handleRemoveParticipant(user)
                                        }
                                    />
                                ))
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    No participants selected yet
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Available Users
                        </Typography>
                        <List>
                            {availableUsers
                                .filter(
                                    (user) =>
                                        !mockRooms
                                            .find((r) => r.id === currentRoom)
                                            ?.participants.includes(user)
                                )
                                .map((user) => (
                                    <ListItem
                                        key={user}
                                        onClick={() =>
                                            handleAddParticipant(user)
                                        }
                                        disabled={selectedUsers.includes(user)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>{user.charAt(0)}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user} />
                                        {selectedUsers.includes(user) && (
                                            <AddIcon color="primary" />
                                        )}
                                    </ListItem>
                                ))}
                        </List>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddParticipantsDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleInviteParticipants}
                        color="primary"
                        disabled={selectedUsers.length === 0}
                    >
                        Invite
                    </Button>
                </DialogActions>
            </Dialog>
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
    );
};

export default ChatPage;
