import React, { useState, useRef } from 'react';
import './PostQuestion.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function PostQuestion() {
    const [question, setQuestion] = useState('');
    const [questionsList, setQuestionsList] = useState([]);
    const containerRef = useRef(null);

    const handlePostQuestion = () => {
        if (question.trim() === '') return;
        setQuestionsList(prevList => [...prevList, { text: question, status: "Pending" }]);
        setQuestion('');
    };

    return (
        <Box 
        sx={{ 
            width: { xs: "90%", sm: "650px" }, // 90% for extra small screens, 650px for small screens and up
            maxWidth: 800, 
            minWidth: 400, 
            height: "600px", 
            marginTop: '60px', 
            p: 4, 
            bgcolor: 'white', 
            borderRadius: "5px", 
            boxShadow: 3 
        }}
        >          
            <Typography sx={{font: "35px" ,fontWeight:600 , textAlign:"center", color:"#455a64"}} variant="h4"  gutterBottom>
                Ask a Question
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={2}
                label="Enter your question"
                variant="outlined"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ mb: 3, fontSize: '1.2rem' }}
            />

            <Stack spacing={2}>
            {/* Other components inside the Stack */}
            <Button 
                variant="contained" 
                endIcon={<SendIcon />} 
                onClick={handlePostQuestion}
                fullWidth={false}  // Ensure it's not full width so it can align to the right
                sx={{ 
                fontSize: '1.2rem',  
                bgcolor: "#37474f", 
                alignSelf: "flex-end"  // Aligns button to the right
                }}
            >
                Submit
            </Button>
            </Stack>

            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={{ borderBottom:"#37474f 1px solid", fontWeight:600,borderRadius: "5px"  , display:"flex" , alignItems:"center" , justifyContent:"left"}}>Your Questions</Typography>
            <Stack 
                spacing={2} 
                sx={{ 
                    mt: 3,
                    height: "250px", 
                    maxHeight: '400px', 
                    overflowY: 'auto', 
                    padding: '5px' ,
                    paddingBottom: 3
                    // border: "1px solid grey",
                    // borderRadius:"5px"
                }} 
                ref={containerRef}
            >
                {questionsList.map((q, index) => (
                    <Box 
                    key={index} 
                    sx={{
                      minHeight: "120px",
                      height: "auto",
                      overflow: "hidden",
                    //   border: '1px solid #ccc',
                      borderRadius: 2,
                      bgcolor: 'white',
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      padding:1
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1.1rem', 
                        wordBreak: "break-word",  // Ensures long words break
                        whiteSpace: "normal"  // Ensures text wraps
                      }}
                    >
                      <span style={{ fontWeight:600}}>Q:</span> {q.text}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: '1rem', 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "right", 
                      }}
                    >
                      <span style={{ fontWeight:600}}>Status:</span><span style={{ color: q.status === "Pending" ? "red" : "green" }}>{q.status}</span>
                    </Typography>
                  </Box>
                  
                ))}
            </Stack>
        </Box>
    );
}

export default PostQuestion;
