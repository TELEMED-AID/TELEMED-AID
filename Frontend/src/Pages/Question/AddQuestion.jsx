import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Paper,
  Stack
} from '@mui/material';
import {
  Cake,
  Wc,
  Public,
  Flag
} from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  
  // Current patient's hardcoded info (will come from auth context later)
  const patientInfo = {
    id: 'patient-123',
    name: "John Smith",
    age: 32,
    gender: "Male",
    nationality: "Canadian",
    country: "Canada"
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0])
      .join('')
      .toUpperCase();

  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newQuestion = {
      content,
      patientId: patientInfo.id,
      // In real app, this will be sent to your backend API
    };

    try {
      // Here you'll call your API to save the question
      // await api.post('/questions', newQuestion);
      alert('Question submitted successfully!');
      setContent('');
      // Navigate back to ShowQuestions page after successful submission
      navigate('/ShowQuestions'); // Adjust the route as needed
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Error submitting question');
    }
  };
const handleCancel = () => {
  navigate('/ShowQuestions'); // or '/articles'
};
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
        {/* Patient Profile */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    backgroundColor: blue[500],
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {getInitials(patientInfo.name)}
                </Avatar>
                <Chip
                  label="Patient"
                  color="primary"
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {patientInfo.name}
                </Typography>
                <Grid container spacing={10}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                      <Typography><Cake sx={{ mr: 1 }} /> {patientInfo.age} years</Typography>
                      <Typography><Wc sx={{ mr: 1 }} /> {patientInfo.gender}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                      <Typography><Public sx={{ mr: 1 }} /> {patientInfo.country}</Typography>
                      <Typography><Flag sx={{ mr: 1 }} /> {patientInfo.nationality}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Question Form */}
        <Typography variant="h5" gutterBottom sx={{
          fontWeight: 'bold',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          '&:before, &:after': {
            content: '""',
            flex: 1,
            borderColor: 'divider',
            mr: 1,
            ml: 1
          }
        }}>
          Ask a Question
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Question"
              variant="outlined"
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 3 }}
              required
              helperText="Please describe your health concern in detail"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                  variant="outlined"
                  size="large"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[700],
                  },
                }}
                disabled={!content.trim() || content.length < 30}
              >
                Submit Question
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default AddQuestion;