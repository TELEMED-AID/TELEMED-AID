import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Route
import { Login, Register, AskQuestion, ArticleSearchPage, ArticlePage } from './components/exports'; // Import your components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/ask" element={<AskQuestion />} /> {/* Ask Question route */}
        <Route path="/searchArticle" element={<ArticleSearchPage />} /> {/* Article search route */}
        <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
    </Router>
  );
}

export default App;
