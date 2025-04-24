import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/article/article/getOne/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 overflow-auto">
      <div className="max-w-5xl mx-auto bg-white px-10 py-8 rounded-xl border border-gray-300 shadow-md overflow-auto">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="text-sm text-gray-500 mb-2">
          {article.category} • {new Date(article.articleTime).toLocaleString()}
        </div>
        <div className="text-md text-gray-700 mb-4">
          By <strong>{article.doctorName}</strong>, {article.doctorCareerLevel} — <em>{article.doctorSpecialization}</em>
        </div>
  
        <hr className="mb-6" />
  
        <div className="prose prose-lg max-w-none whitespace-pre-line text-gray-800">
          {article.content}
        </div>
      </div>
    </div>
  );
  
};

export default ArticlePage;
