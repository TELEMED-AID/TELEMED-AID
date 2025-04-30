import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Route
import { Login, Register, AskQuestion, QuestionSearchPage, 
  QuestionDetailPage, ArticleSearchPage, ArticlePage, PublishArticlePage } from './components/exports'; // Import your components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/searchArticle" element={<ArticleSearchPage />} /> {/* Article search route */}
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/publishArticle" element={<PublishArticlePage />} />

        <Route path="/ask" element={<AskQuestion />} /> {/* Ask Question route */}
        <Route path="/searchQuestion" element={<QuestionSearchPage />} /> {/* Question search route */}
        <Route path="/question/:id" element={<QuestionDetailPage />} />

        </Routes>
    </Router>
  );
}

export default App;
