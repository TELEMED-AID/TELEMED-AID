import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleSearchPage = () => {
  const [term, setTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const search = async (p = 0) => {
    try {
      const response = await axios.get(`http://localhost:8081/article/article/searchArticle`, {
        params: { term, page: p, size: 10 }
      });
      setArticles(response.data.content);
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
            placeholder="Search for articles"
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {articles.map(article => (
            <div
              key={article.id}
              onClick={() => navigate(`/article/${article.id}`)}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-xl font-semibold">{article.title} <span className="text-sm text-gray-500">({article.category})</span></div>
              <p className="mt-2 text-gray-700">{article.contentSnippet}</p>
              <div className="mt-2 text-sm text-gray-500">
                {article.doctorName} • {article.doctorCareerLevel}
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

export default ArticleSearchPage;
