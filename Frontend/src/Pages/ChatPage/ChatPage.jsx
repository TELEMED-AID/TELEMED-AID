import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
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
import usePostItem from "../../Hooks/usePost";
import useGet from "../../Hooks/useGet";
import { GET_CHAT_ROOMS, GET_CHAT_ROOM_MESSAGES } from "../../API/APIRoutes";
import { Client } from "@stomp/stompjs";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import CircularProgress from "@mui/material/CircularProgress";


const ChatPage = () => {
  const navigate = useNavigate();
  const { userId, role, isLogged } = useSelector((state) => state.user);
  const [sendingMessage, setSendingMessage] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [currentRoom, setCurrentRoom] = useState(null);
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
  const { loading: sendMessageLoading, postItem: sendMessageApi } =
    usePostItem();
  const { loading: getAllChatsLoading, getItem: getAllChats, getItem } = useGet();
  const { loading: getChatMessagesLoading, getItem: getChatMessages } =
    useGet();
  const Doctor = "DOCTOR";
  const [connected, setConnected] = useState(false);
  const [rooms, setRooms] = useState([]);

  const stompClient = useRef(null);

  const [availableUsers, setAvailableUsers] = useState([]);
  const [mockUsers, setMockUsers] = useState([]);

  // Fetch simplified doctor data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getItem('/api/doctor/simplified', false);

        if (response) {
          // Transform data for availableUsers (just names)
          const doctorNames = response.map(doctor => doctor.name);
          setAvailableUsers(doctorNames);
          console.log('Available Users:', doctorNames);
          
          // Transform data for mockUsers (with id, name, role)
          const formattedDoctors = response.map(doctor => ({
            id: doctor.userId,  // matches SimplifiedDoctorDto.userId
            name: doctor.name,  // matches SimplifiedDoctorDto.name
            role: Doctor,
            specialization: doctor.specializationName,  // from DTO
            careerLevel: doctor.careerLevelName  // from DTO
          }));
          
          setMockUsers(formattedDoctors);
          console.log('Mock Users:', formattedDoctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Fallback to default data if API fails
        // setAvailableUsers([
        //   "Dr. Brown",
        //   "Nurse Jane",
        //   "Patient Carol",
        //   "Dr. Miller",
        //   "Patient Dave"
        // ]);
        // setMockUsers([
        //   { id: 1, name: "Dr. Smith", role: "Doctor" },
        //   { id: 2, name: "Dr. Johnson", role: "Doctor" },
        //   { id: 3, name: "Dr. Alice", role: "Doctor" },
        //   { id: 4, name: "Dr. Bob", role: "Doctor" }
        // ]);
      }
    };

    fetchDoctors();
}, []); // Empty dependency array
  useEffect(() => {
    // setMessages(mockMessages[currentRoom] || []);
  }, [currentRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAllChatsCallBack = (data) => {
    console.log("All chats data received:", data);
    setRooms(data || []);
  };

  const formatDateFields = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    getAllChats(GET_CHAT_ROOMS + `/${userId}`, false, getAllChatsCallBack);
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (!connected) {
      console.warn("WebSocket not connected yet.");
      return;
    }

    if (message.trim()) {
      setSendingMessage(true);
      const chatMessage = {
        senderId: userId,
        roomId: currentRoom,
        content: message,
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      stompClient.current.publish({
        destination: "/app/chat/send",
        body: JSON.stringify(chatMessage),
      });
    }

    // setMessages([...messages, newMessage]);
    // setMessage("");
  };

  const getChatMessagesCallBack = (data) => {
    console.log("Chat Messages data received:", data);
    setMessages((prev) => [...prev, ...data]);
  };

  const handleRoomSelect = (roomId) => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws?userId=${userId}&roomId=${roomId}`,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        getChatMessages(
          GET_CHAT_ROOM_MESSAGES + "/" + roomId,
          false,
          getChatMessagesCallBack
        );

        setCurrentRoom(roomId);
        setMessages([]); // Clear messages for the new room
        if (isMobile) setDrawerOpen(false);

        client.subscribe(`/topic/chat/${roomId}`, (message) => {
          const msg = JSON.parse(message.body);
          console.log("Received message:", msg);
          setMessages((prev) => [...prev, msg]);
          if (msg.senderId === userId) {
            setMessage("");
            setSendingMessage(false);
          }
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.roomId === roomId
                ? { ...room, lastMessage: msg.content }
                : room
            )
          );
        });
      },

      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
    });

    stompClient.current = client;
    client.activate();

    return () => {
      client.deactivate();
      setConnected(false);
    };
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
      rooms.push(newRoom);
      setNewRoomName("");
      setShowCreateRoomDialog(false);
      handleRoomSelect(newRoom.roomId);
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
    const room = rooms.find((r) => r.roomId === currentRoom);

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

  if (getAllChatsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={theme.pageHeight}
      >
        <LoadingComponent />
      </Box>
    );
  }

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
            <IconButton onClick={() => navigate("/profile")} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ ml: 1 }}>
            {rooms.find((r) => r.roomId === currentRoom)?.roomName || "Chat"}
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
          {rooms.map((room) => (
            <React.Fragment key={room.roomId}>
              <ListItem
                selected={currentRoom === room.roomId}
                onClick={() => handleRoomSelect(room.roomId)}
                sx={{
                  py: 1.5,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(51, 180, 212, 0.12)",
                  },
                  cursor: "pointer",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "#c2185b" }}>
                    {room.roomName.charAt(0)}
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
                          currentRoom === room.roomId ? "bold" : "normal"
                        }
                      >
                        {room.roomName}
                      </Typography>
                      {/* {room.unreadCount > 0 && (
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
                                            )} */}
                    </Box>
                  }
                  secondary={
                    <Typography
                      // noWrap
                      sx={{
                        color:
                          currentRoom === room.roomId
                            ? "text.primary"
                            : "text.secondary",
                        fontWeight:
                          currentRoom === room.roomId ? "bold" : "normal",
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
          getChatMessagesLoading ? (
            // Show loading spinner while messages are loading
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
              }}
            >
              <LoadingComponent />
            </Box>
          ) : (
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
                      {rooms.find((r) => r.roomId === currentRoom)?.roomName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Participants:{" "}
                      {rooms
                        .find((r) => r.roomId === currentRoom)
                        ?.participants.join(", ")}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{ color: "#ad1457", mr: "20px" }}
                    onClick={() => setShowAddParticipantsDialog(true)}
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
                        msg.senderId === userId ? "flex-end" : "flex-start",
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
                          msg.senderId === userId ? "#33b4d4" : "background.paper",
                        color: msg.senderId === userId ? "#ffffff" : "text.primary",
                        boxShadow: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        sender: {msg.senderName}
                      </Typography>
                      <Typography variant="body1">{msg.content}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "right",
                          color:
                            msg.senderId === userId
                              ? "rgba(255,255,255,0.7)"
                              : "text.secondary",
                        }}
                      >
                        {formatDateFields(msg.createdAt)}
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
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    sx={{ mr: 1 }}
                    InputProps={{
                      startAdornment: isMobile && (
                        <InputAdornment position="start">
                          <IconButton
                            color="primary"
                            onClick={() => setShowAddParticipantsDialog(true)}
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
                    disabled={!message.trim() || sendingMessage}
                  >
                    {sendingMessage ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <SendIcon />
                    )}
                  </IconButton>
                </Box>
              </Paper>
            </>
          )
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
          <Button onClick={() => setShowCreateRoomDialog(false)}>Cancel</Button>
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
                    onDelete={() => handleRemoveParticipant(user)}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
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
                    !rooms
                      .find((r) => r.id === currentRoom)
                      ?.participants.includes(user)
                )
                .map((user) => (
                  <ListItem
                    key={user}
                    onClick={() => handleAddParticipant(user)}
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
                selectedUserIds.includes(user.id) && user.role === "Doctor"
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
          // handleRoomSelect(newRoom.roomId);
        }}
      />
    </Box>
  );
};

export default ChatPage;