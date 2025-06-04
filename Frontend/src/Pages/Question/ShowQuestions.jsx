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
  Chip
} from '@mui/material';
import { QuestionAnswer, Person, Cake, Wc, Public } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const ShowQuestions = () => {
  // State to track which questions are expanded
  const [expandedQuestions, setExpandedQuestions] = useState({});

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

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: 'bold',
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        '&:before, &:after': {
          content: '""',
          flex: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          mr: 1,
          ml: 1
        }
      }}>
        Patient Questions
      </Typography>

      {questions.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <QuestionAnswer sx={{ fontSize: 60, color: blue[200], mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            No questions available yet
          </Typography>
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
  );
};

export default ShowQuestions;