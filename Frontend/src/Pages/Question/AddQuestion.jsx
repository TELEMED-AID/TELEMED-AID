import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  Stack,
  LinearProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  Cake,
  Wc,
  Public,
  Flag,
  MedicalServices,
  Work,
  Badge
} from '@mui/icons-material';
import { blue, green } from '@mui/material/colors';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useNavigate } from 'react-router-dom';
import useGet from "../../Hooks/useGet";

const AddQuestion = () => {
  const navigate = useNavigate();
  const { userId, role, isLogged } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const { loading, getItem } = useGet();
  
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLogged && userId && (role === "PATIENT" || role === "DOCTOR")) {
        const endpoint = role === "PATIENT" 
          ? `/api/patient/get-patient/${userId}`
          : `/doctor/${userId}`;
        
        await getItem(
          endpoint,
          false,
          (response) => {
            setUserInfo(response);
          },
          () => {
            setUserInfo(null);
          }
        );
      }
    };

    fetchUserData();
  }, [isLogged, userId, role]);

  const getInitials = (name) =>
    name
      ?.split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0])
      .join('')
      .toUpperCase() || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newQuestion = {
      content,
      userId,
      userRole: role,
    };

    try {
      // Here you'll call your API to save the question
      // await api.post('/questions', newQuestion);
      alert('Question submitted successfully!');
      setContent('');
      navigate('/ShowQuestions');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Error submitting question');
    }
  };

  const handleCancel = () => {
    navigate('/ShowQuestions');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
          <LinearProgress sx={{ mt: 2 }} />
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
            Loading user information...
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  if (!userInfo) {
    return (
      <>
        <Navbar />
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
          <Alert severity="error">
            Failed to load user information or you're not authorized to ask questions.
          </Alert>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
        {/* User Profile */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    backgroundColor: role === "DOCTOR" ? blue[500] : green[500],
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {getInitials(userInfo.name)}
                </Avatar>
                <Chip
                  label={role === "DOCTOR" ? "Doctor" : "Patient"}
                  color={role === "DOCTOR" ? "primary" : "success"}
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {userInfo.name}
                </Typography>
                <Grid container spacing={10}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                      <Typography><Wc sx={{ mr: 1 }} /> {userInfo.gender || 'N/A'}</Typography>
                      <Typography><Cake sx={{ mr: 1 }} /> {userInfo.birthDate || 'N/A'}</Typography>
                      <Typography><Public sx={{ mr: 1 }} /> {userInfo.countryName || 'N/A'}</Typography>                      
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                      {role === "DOCTOR" && (
                        <>
                          <Typography><Work sx={{ mr: 1 }} /> {userInfo.careerLevel || 'N/A'}</Typography>
                          <Typography><MedicalServices sx={{ mr: 1 }} /> {userInfo.specialization || 'N/A'}</Typography>
                        </>
                      )}
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
          {role === "DOCTOR" ? "Ask a Medical Question" : "Ask a Health Question"}
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={role === "DOCTOR" ? "Your Medical Question" : "Your Health Question"}
              variant="outlined"
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 3 }}
              required
              helperText={role === "DOCTOR" 
                ? "Please describe your medical question in detail" 
                : "Please describe your health concern in detail"}
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
                  backgroundColor: role === "DOCTOR" ? blue[500] : green[500],
                  '&:hover': {
                    backgroundColor: role === "DOCTOR" ? blue[700] : green[700],
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