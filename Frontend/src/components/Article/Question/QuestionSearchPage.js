import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleSearchPage = () => {
  const [term, setTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const search = async (p = 0) => {
    try {
      const response = await axios.get(`http://localhost:8081/article/article/searchArticle`, {
        params: { term, page: p, size: 5 }
      });
      setArticles(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Search failed.");
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
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <span className="text-sm text-blue-500">{article.category}</span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3">{article.contentSnippet}</p>

              <div className="mt-4 text-sm text-gray-500">
                By <span className="font-medium text-gray-700">{article.doctorName}</span>
                {article.doctorCareerLevel && ` • ${article.doctorCareerLevel}`}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
};

export default ArticleSearchPage;
