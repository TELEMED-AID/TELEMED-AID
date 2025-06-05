import React, { useState } from 'react';
import {
  Box,
  Typography,
  CardHeader,
  Avatar,
  CardContent,
  Paper,
  Divider,
  Button,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@mui/material';
import { QuestionAnswer, Person, Cake, Wc, Public, Add, Comment, Send } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useNavigate } from 'react-router-dom';

const ShowQuestions = () => {
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [showComments, setShowComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const [comments, setComments] = useState({
    'q-001': [
      {
        id: 'c-001',
        content: "Chest pain during exercise should always be evaluated, especially at your age. I recommend scheduling an appointment with a cardiologist for a stress test.",
        author: "Dr. Sarah Johnson",
        date: "2023-06-16",
        isDoctor: true
      },
      {
        id: 'c-002',
        content: "I had similar symptoms last year. Turned out to be acid reflux. Maybe try antacids before exercise?",
        author: "Mike Thompson",
        date: "2023-06-17",
        isDoctor: false
      }
    ],
    'q-002': [
      {
        id: 'c-003',
        content: "This could be school-related anxiety. I'd suggest talking to her teacher to see if there are any issues at school.",
        author: "Dr. Emily Chen",
        date: "2023-05-23",
        isDoctor: true
      }
    ],
    'q-003': []
  });
  const navigate = useNavigate();

  // Mock data - will be replaced with DB fetch
  const questions = [
    {
      id: 'q-001',
      content: "I've been experiencing chest pain occasionally when I exercise. It goes away when I rest. Should I be concerned about this? I'm a 45-year-old male with no prior heart conditions. The pain is sharp but brief, lasting about 30 seconds to a minute. I don't have any other symptoms like shortness of breath or dizziness.",
      date: "2023-06-15",
      patientId: "patient-123",
      patientName: "John Smith",
      patientAge: 45,
      patientGender: "Male",
      patientCountry: "USA"
    },
    {
      id: 'q-002',
      content: "My 8-year-old daughter has been complaining of frequent stomach aches before school. They seem to go away on weekends. Could this be stress-related or should we look for physical causes? She doesn't have any vomiting or diarrhea, just discomfort that makes her not want to eat breakfast. She's otherwise healthy with no known allergies.",
      date: "2023-05-22",
      patientId: "patient-456",
      patientName: "Lisa Johnson",
      patientAge: 8,
      patientGender: "Female",
      patientCountry: "Canada"
    },
    {
      id: 'q-003',
      content: "I've been having persistent headaches for about 3 weeks now, mostly in the morning. They're dull but constant, and over-the-counter pain relievers don't seem to help much. I've never had headaches like this before. I'm a 32-year-old female with no significant medical history. Should I be worried about something serious like a brain tumor?",
      date: "2023-04-10",
      patientId: "patient-789",
      patientName: "Maria Garcia",
      patientAge: 32,
      patientGender: "Female",
      patientCountry: "Spain"
    }
  ];

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0])
      .join('')
      .toUpperCase();

  const toggleExpand = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleComments = (questionId) => {
    setShowComments(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleCommentChange = (questionId, text) => {
    setCommentTexts(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const addComment = (questionId) => {
    if (!commentTexts[questionId]?.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      content: commentTexts[questionId],
      author: "Current User", // Replace with actual user name
      date: new Date().toISOString().split('T')[0],
      isDoctor: false // Change based on user role
    };

    setComments(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), newComment]
    }));

    setCommentTexts(prev => ({
      ...prev,
      [questionId]: ''
    }));
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          '&:before, &:after': {
            content: '""',
            flex: 1,
            borderColor: 'divider',
            mr: 1,
            ml: 1
          }
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Patient Questions
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/AddQuestion')}
            sx={{
              bgcolor: "#33b4d4",
              "&:hover": {
                bgcolor: "#2a9cb3",
              },
              ml: 2,
            }}
          >
            Ask Question
          </Button>
        </Box>

        {questions.length === 0 ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <QuestionAnswer sx={{ fontSize: 60, color: blue[200], mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No questions available yet
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/questions/ask')}
              sx={{
                mt: 2,
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[700]
                }
              }}
            >
              Ask First Question
            </Button>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 0 }}>
            {questions.map((question, index) => (
              <React.Fragment key={question.id}>
                <Box sx={{ p: 3 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                        {getInitials(question.patientName)}
                      </Avatar>
                    }
                    title={question.patientName}
                    subheader={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Cake sx={{ fontSize: 16, mr: 0.5 }} />
                          <span>{question.patientAge} years</span>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Wc sx={{ fontSize: 16, mr: 0.5 }} />
                          <span>{question.patientGender}</span>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Public sx={{ fontSize: 16, mr: 0.5 }} />
                          <span>{question.patientCountry}</span>
                        </Box>
                      </Box>
                    }
                    action={
                      <Chip
                        icon={<Person />}
                        label="Patient"
                        color="primary"
                        sx={{ mr: 2 }}
                      />
                    }
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'pre-line',
                        mb: 3,
                        ...(!expandedQuestions[question.id] && {
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        })
                      }}
                    >
                      {question.content}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Posted on: {question.date}
                      </Typography>
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => toggleComments(question.id)}
                          startIcon={<Comment />}
                          sx={{
                            mr: 2,
                            color: blue[500],
                            borderColor: blue[500],
                            '&:hover': {
                              borderColor: blue[700],
                              backgroundColor: blue[50]
                            }
                          }}
                        >
                          {comments[question.id]?.length || 0} Comments
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => toggleExpand(question.id)}
                          sx={{
                            color: blue[500],
                            borderColor: blue[500],
                            '&:hover': {
                              borderColor: blue[700],
                              backgroundColor: blue[50]
                            }
                          }}
                        >
                          {expandedQuestions[question.id] ? 'Show Less' : 'Read Full Question'}
                        </Button>
                      </Box>
                    </Box>

                    {/* Comments Section */}
                    {showComments[question.id] && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Comments
                        </Typography>
                        
                        {comments[question.id]?.length > 0 ? (
                          <List sx={{ mb: 2 }}>
                            {comments[question.id].map(comment => (
                              <ListItem key={comment.id} alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ 
                                    bgcolor: comment.isDoctor ? blue[500] : 'grey.500',
                                    width: 40, 
                                    height: 40 
                                  }}>
                                    {getInitials(comment.author)}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={comment.author}
                                  secondary={
                                    <>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {comment.content}
                                      </Typography>
                                      <Typography variant="caption" display="block">
                                        {comment.date} • {comment.isDoctor ? 'Doctor' : 'User'}
                                      </Typography>
                                    </>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            No comments yet. Be the first to respond!
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Add a comment..."
                            value={commentTexts[question.id] || ''}
                            onChange={(e) => handleCommentChange(question.id, e.target.value)}
                            multiline
                            rows={2}
                            sx={{ mr: 1 }}
                          />
                          <IconButton
                            color="primary"
                            onClick={() => addComment(question.id)}
                            disabled={!commentTexts[question.id]?.trim()}
                            sx={{ height: '56px' }}
                          >
                            <Send />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Box>

                {/* Add divider after each question except the last one */}
                {index < questions.length - 1 && (
                  <Divider sx={{ mx: 3, border: '1px solid' }} />
                )}
              </React.Fragment>
            ))}
          </Paper>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default ShowQuestions;