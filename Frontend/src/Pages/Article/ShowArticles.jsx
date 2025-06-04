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
import { Article, Category, MedicalServices } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const ShowArticles = () => {
  // State to track which articles are expanded
  const [expandedArticles, setExpandedArticles] = useState({});

  // Mock data - will be replaced with DB fetch
  const articles = [
    {
      id: 'art-001',
      title: "Advances in Cardiac Treatment",
      content: "Recent breakthroughs in cardiac treatment have shown significant improvement in patient outcomes. The new techniques involve minimally invasive procedures that reduce recovery time. These procedures are now being adopted worldwide, with success rates exceeding 90% in most cases. Patients report less pain and faster return to normal activities compared to traditional open-heart surgeries. The article explores several case studies and the long-term benefits observed over a 5-year period.",
      category: "Cardiology",
      date: "2023-06-15",
      doctorId: "doc-123",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialization: "Cardiologist"
    },
    {
      id: 'art-002',
      title: "Pediatric Nutrition Guidelines",
      content: "Updated nutrition guidelines for children emphasize the importance of balanced diets from an early age. The new recommendations include increased intake of whole grains, reduced sugar consumption, and earlier introduction of diverse food groups. Research shows that children following these guidelines have lower rates of obesity and better cognitive development. The article provides detailed meal plans for different age groups and addresses common parental concerns about picky eaters and food allergies.",
      category: "Pediatrics",
      date: "2023-05-22",
      doctorId: "doc-456",
      doctorName: "Dr. Michael Chen",
      doctorSpecialization: "Pediatrician"
    },
    {
      id: 'art-003',
      title: "Neurological Developments in 2023",
      content: "This year has seen remarkable progress in understanding neurodegenerative diseases. New research suggests that early intervention with a combination of medication and cognitive therapy can slow progression of conditions like Alzheimer's by up to 40%. Breakthroughs in imaging technology allow for earlier diagnosis, while experimental treatments targeting protein buildup in the brain show promise in clinical trials. The article reviews these developments and discusses their implications for future treatment protocols.",
      category: "Neurology",
      date: "2023-04-10",
      doctorId: "doc-789",
      doctorName: "Dr. Emily Wong",
      doctorSpecialization: "Neurologist"
    }
  ];

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0])
      .join('')
      .toUpperCase();

  const toggleExpand = (articleId) => {
    setExpandedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
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
        Medical Articles
      </Typography>

      {articles.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Article sx={{ fontSize: 60, color: blue[200], mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            No articles available yet
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 0 }}>
          {articles.map((article, index) => (
            <React.Fragment key={article.id}>
              <Box sx={{ p: 3 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                      {getInitials(article.doctorName)}
                    </Avatar>
                  }
                  title={article.doctorName}
                  subheader={`${article.doctorSpecialization} • ${article.date}`}
                  action={
                    <Chip 
                      icon={<Category />} 
                      label={article.category} 
                      color="primary" 
                      sx={{ mr: 2 }}
                    />
                  }
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {article.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-line', 
                      mb: 3,
                      ...(!expandedArticles[article.id] && {
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      })
                    }}
                  >
                    {article.content}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<MedicalServices />}
                    onClick={() => toggleExpand(article.id)}
                    sx={{ 
                      color: blue[500],
                      borderColor: blue[500],
                      '&:hover': {
                        borderColor: blue[700],
                        backgroundColor: blue[50]
                      }
                    }}
                  >
                    {expandedArticles[article.id] ? 'Show Less' : 'Read Full Article'}
                  </Button>
                </CardContent>
              </Box>
              
              {/* Add divider after each article except the last one */}
              {index < articles.length - 1 && (
                <Divider sx={{ mx: 3, border: '1px solid' }} />
              )}
            </React.Fragment>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default ShowArticles;