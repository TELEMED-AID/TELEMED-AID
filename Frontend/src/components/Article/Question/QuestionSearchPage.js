import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionSearchPage = () => {
  const [term, setTerm] = useState('');
  const [question, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const search = async (p = 0) => {
    try {
      const response = await axios.get(`http://localhost:8081/article/question/searchQuestion`, {
        params: { term, page: p, size: 10 }
      });
      setQuestions(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="p-6 bg-white shadow-md">
        <form
          onSubmit={e => { e.preventDefault(); search(); }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search for questions"
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {question.map(question => (
            <div
              key={question.id}
              onClick={() => navigate(`/question/${question.id}`)}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {question.title}
                    </h2>
                    <span className="text-xs text-gray-400">
                        {new Date(question.questionTime).toLocaleString()}
                    </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">
                    {question.contentSnippet}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                        {question.patientWrittenName?.charAt(0).toUpperCase()}
                    </div>
                        <span className="text-gray-700 text-sm">{question.patientWrittenName}</span>
                </div>

            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(totalPages).keys()].map(p => (
            <button
              key={p}
              onClick={() => search(p)}
              className={`px-4 py-2 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionSearchPage;
