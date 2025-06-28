import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Avatar
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000000);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/chatbot/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: input }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await res.json();
            const botMessage = {
                sender: 'bot',
                text: data.response || 'No response received from the server.'
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'An error occurred while connecting to the server.' }
            ]);
        }

        setInput('');
        setLoading(false);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    🤖 Medical Chatbot
                </Typography>

                <Paper elevation={3} sx={{ p: 3, height: '70vh', overflowY: 'auto', mb: 3 }}>
                    {messages.length === 0 && (
                        <Typography variant="body1" color="text.secondary" textAlign="center">
                            Start typing your question below 👇
                        </Typography>
                    )}
                    {messages.map((msg, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 2
                            }}
                        >
                            {msg.sender === 'bot' && (
                                <Avatar sx={{ mr: 1, bgcolor: blue[500] }}>🤖</Avatar>
                            )}
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    maxWidth: '70%',
                                    backgroundColor: msg.sender === 'user' ? blue[100] : grey[100],
                                    color: 'black',
                                    whiteSpace: 'pre-line'
                                }}
                            >
                                <Typography variant="body1">{msg.text}</Typography>
                            </Box>
                            {msg.sender === 'user' && (
                                <Avatar sx={{ ml: 1, bgcolor: blue[700] }}>👤</Avatar>
                            )}
                        </Box>
                    ))}
                </Paper>

                {/* Input Field */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Type your medical question..."
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleEnter}
                    />
                    <Button
                        variant="contained"
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        sx={{
                            backgroundColor: blue[500],
                            '&:hover': { backgroundColor: blue[700] }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
                    </Button>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Chatbot;
