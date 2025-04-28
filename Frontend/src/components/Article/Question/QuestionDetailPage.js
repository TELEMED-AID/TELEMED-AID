import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect for fetching the question data
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get('http://localhost:8081/article/question/getCommentsOnPost', {
          params: { questionId: id }
        });
        setQuestion(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) return <div className="p-6">Loading...</div>;

  // Sort comments in descending order by vote count
  const sortedComments = [...question.comments].sort((a, b) => b.voteCount - a.voteCount);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const commentDTO = {
        doctorId: 1, // Replace with actual logged-in doctor's ID
        content: newComment,
        questionId: question.id,
        commentTime: new Date().toISOString(),
      };

      const response = await axios.post('http://localhost:8081/article/question/commentQuestion', commentDTO);

      if (response.status === 201) {
        // Add the new comment to the state without re-fetching from the backend
        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          comments: [
            ...prevQuestion.comments,
            {
              id: response.data.id,
              content: newComment,
              doctorName: 'Doctor Name', // Replace with actual doctor name
              time: new Date().toISOString(),
              voteCount: 0, // Initial vote count
            },
          ],
        }));
        setNewComment('');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{question.title}</h1>
        <div className="text-gray-600 mb-6 whitespace-pre-line">{question.content}</div>

        <div className="flex items-center text-sm text-gray-400 mb-8">
          <span>{question.patientWrittenName}</span>
          <span className="mx-2">•</span>
          <span>{new Date(question.questionTime).toLocaleString()}</span>
        </div>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

        {sortedComments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {sortedComments.map(comment => (
              <div
                key={comment.id}
                className="p-5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-shadow shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{comment.doctorName}</span>
                  <span className="text-xs text-gray-400">{new Date(comment.time).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 mb-3 whitespace-pre-line">{comment.content}</p>
                <div className={`text-sm font-medium ${comment.voteCount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comment.voteCount >= 0 ? `+${comment.voteCount}` : comment.voteCount} votes
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className="my-8 border-gray-300" />

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add a Comment</h3>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            rows="4"
            className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
