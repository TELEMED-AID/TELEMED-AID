import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Route
import { Login, Register, Appointment, Header, Article, UpdateProfile , PostQuestion } from './components/exports'; // Import your components

function App() {
  return (
    <>
    <Header />
    <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login route */}
          <Route path="/register" element={<Register />} /> {/* Register route */}
          <Route path="/postquestion" element={<PostQuestion />} /> {/* Register route */}
        </Routes>
      </Router>
    </>

    // <>
      
    //   <Header />
    //    {/* <Appointment /> */}
    //    <Login />
    // </>
    

  );
}

export default App;
