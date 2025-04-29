import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('Something went wrong, please try again')
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) return <div className="p-6">Loading...</div>;

  // Sort comments in descending order by vote count
  const sortedComments = [...question.comments].sort((a, b) => b.voteCount - a.voteCount);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    setErrorMessage('');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setErrorMessage('Empty comment, please write a useful comment.');
      return;
    }

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
        console.log('Comment POST response:', response.data); // <-- Add this

        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          comments: [
            ...prevQuestion.comments,
            {
              id: response.data.id,
              content: response.data.content,
              doctorName: response.data.doctorName, 
              time: response.data.time,
              voteCount: response.data.voteCount, 
            },
          ],
        }));
        setNewComment('');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setErrorMessage('Failed to add comment. Please try again later.');

    } finally {
      setIsSubmitting(false);
    }
  };
  const handleVote = async (commentId, rank) => {
    try {
      const voteDTO = {
        commentId,
        doctorId: 1, // Replace with actual doctor ID
        rank, // +1 for upvote, -1 for downvote
      };
  
      const response = await axios.post('http://localhost:8081/article/question/addVote', voteDTO);
  
      if (response.status === 201) {
        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          comments: prevQuestion.comments.map((comment) =>
            comment.id === response.data.commentId
              ? { ...comment, voteCount: response.data.rank }
              : comment
          ),
        }));
      }
    } catch (error) {
      console.error('Voting failed:', error);
      setErrorMessage('Unable to register vote. Please try again later.');
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
                <div className="flex items-center gap-3 text-sm font-medium">
                  <button
                    onClick={() => handleVote(comment.id, 1)}
                    className="text-green-600 hover:text-green-800 focus:outline-none"
                    title="Upvote"
                  >
                    ▲
                  </button>
                    <span className={`${comment.voteCount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {comment.voteCount >= 0 ? `+${comment.voteCount}` : comment.voteCount}
                    </span>
                  <button
                    onClick={() => handleVote(comment.id, -1)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    title="Downvote"
                  >
                    ▼
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
        

        <hr className="my-8 border-gray-300" />

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add a Comment</h3>
        {errorMessage && (
          <div className="mb-4 flex items-start p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-sm">
            <svg
              className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856C18.07 19 19 18.07 19 16.938V7.062C19 5.93 18.07 5 16.938 5H7.062C5.93 5 5 5.93 5 7.062v9.876C5 18.07 5.93 19 7.062 19z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

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
