/**
 * SRS: Publishing questions
 * PATM: (PA_PHCF_P1)
 */

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const AskQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    patientWrittenName: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // Define statusMessage state

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

    const { title, content, patientWrittenName } = formData;

    // Manual validation
    if (!title.trim() || !content.trim() || !patientWrittenName.trim()) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const question = {
      ...formData,
      questionTime: new Date().toISOString(),
    };

    try {
        const response = await axios.post('http://localhost:8081/article/question/publishQuestion', question);
        if (response.status >= 400) {
          setErrorMessage(response.data);
          setStatusMessage('');
          return
        }
        setFormData({ title: '', content: '', patientWrittenName: '' });
        setStatusMessage(response.data); // Show success message
        setErrorMessage(''); // Clear any previous error message
      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong while submitting your question.');
        setStatusMessage(''); // Clear any previous success message
      }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        <h3 className="mb-4">Ask a Question</h3>
        {statusMessage && <Alert variant="success">{statusMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter a short title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              placeholder="Describe your problem in detail"
              rows={5}
              value={formData.content}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Name (can be fake)</Form.Label>
            <Form.Control
              type="text"
              name="patientWrittenName"
              placeholder="John Doe"
              value={formData.patientWrittenName}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AskQuestion;
