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
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import {
  MedicalServices,
  Badge,
  Cake,
  Wc,
  Public,
  Flag,
  Phone,
  Category
} from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useNavigate } from 'react-router-dom';
import { ARTICLE_PUBLISH_URL } from '../../API/APIRoutes';
import usePost from '../../Hooks/usePost';

const AddArticle = () => {
  const navigate = useNavigate();
  const { loading, postItem } = usePost();

  // Hardcoded doctor info
  const doctorInfo = {
    id: 1,
    name: 'Dr. Amr Taman',
    specialization: 'Cardiology',
    careerLevel: 'Consultant',
    age: 20,
    gender: 'Male',
    country: 'EGY',
    nationality: 'Egyptian',
    phone: '+20-1234568-123-4567'
  };

  const getInitials = (name) =>
      name
          ?.split(' ')
          .filter(part => part.length > 0)
          .map(part => part[0])
          .join('')
          .toUpperCase();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'Dermatology',
    'General Medicine',
    'Surgery',
    'Psychiatry'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) return;

    const newArticle = {
      title,
      content,
      category,
      doctorId: doctorInfo.id,
      articleTime: new Date().toISOString()
    };

    postItem(
        ARTICLE_PUBLISH_URL,
        newArticle,
        () => {
          setTitle('');
          setContent('');
          setCategory('');
          navigate('/ShowArticles');
        },
        'Article submitted successfully!',
        'Failed to submit article. Please try again.'
    );
  };

  const handleCancel = () => {
    navigate('/ShowArticles');
  };

  return (
      <>
        <ScrollToTop />
        <Navbar />
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
          {/* Doctor Profile */}
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
                    {getInitials(doctorInfo.name)}
                  </Avatar>
                  <Chip
                      label={doctorInfo.specialization}
                      color="error"
                      icon={<MedicalServices />}
                  />
                </Grid>

                <Grid item xs={12} md={9}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {doctorInfo.name}
                  </Typography>
                  <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={2}>
                        <Typography><Badge sx={{ mr: 1 }} /> {doctorInfo.careerLevel}</Typography>
                        <Typography><Cake sx={{ mr: 1 }} /> {doctorInfo.age} years</Typography>
                        <Typography><Wc sx={{ mr: 1 }} /> {doctorInfo.gender}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={2}>
                        <Typography><Public sx={{ mr: 1 }} /> {doctorInfo.country}</Typography>
                        <Typography><Flag sx={{ mr: 1 }} /> {doctorInfo.nationality}</Typography>
                        <Typography><Phone sx={{ mr: 1 }} /> {doctorInfo.phone}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Article Form */}
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
            Submit New Article
          </Typography>

          <Paper elevation={3} sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      sx={{ mb: 3 }}
                      required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        startAdornment={<Category sx={{ color: 'action.active', mr: 1 }} />}
                        required
                    >
                      {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                  fullWidth
                  label="Article Content"
                  variant="outlined"
                  multiline
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                  helperText="Minimum 300 characters"
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleCancel}
                    disabled={loading}
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
                    disabled={!title.trim() || !content.trim() || content.length < 300 || !category || loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Article'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
        <Footer />
      </>
  );
};

export default AddArticle;
