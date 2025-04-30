/**
 * SRS: Publishing articles
 * PATM: (DR_ARCF_P1)
 */

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const PublishArticle = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage('');
    setStatusMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, category } = formData;

    if (!title.trim() || !content.trim() || !category.trim()) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const article = {
      ...formData,
      articleTime: new Date().toISOString(),
      doctorNationalId: 1, // Replace with actual doctor ID if needed
    };

    try {
      const response = await axios.post('http://localhost:8081/article/article/publishArticle', article);
      if (response.status >= 400) {
        setErrorMessage(response.data);
        setStatusMessage('');
        return;
      }
      setFormData({ title: '', content: '', category: '' });
      setStatusMessage('Article published successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong while submitting your article.');
      setStatusMessage('');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        <h3 className="mb-4">Publish an Article</h3>
        {statusMessage && <Alert variant="success">{statusMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter the article title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Medical | Advice | Mental Health | etc."
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              placeholder="Write your article content"
              rows={6}
              value={formData.content}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Publish
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default PublishArticle;
