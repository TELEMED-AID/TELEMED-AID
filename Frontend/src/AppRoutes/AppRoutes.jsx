// Description: This file contains the routes for the application.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as DefaultRoutes from "../AppRoutes/DefaultRoutes";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AddArticle from "../Pages/Article/AddArticle";
import ShowArticles from "../Pages/Article/ShowArticles";
import AddQuestion from "../Pages/Question/AddQuestion";
import ShowQuestions from "../Pages/Question/ShowQuestions";
export default function Paths() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={DefaultRoutes.Login} element={<Login />} />
            <Route path={DefaultRoutes.Signup} element={<Signup />} />
            <Route path={DefaultRoutes.AddArticle} element={<AddArticle />} />
            <Route path={DefaultRoutes.ShowArticles} element={<ShowArticles />} />
            <Route path={DefaultRoutes.AddQuestion} element={<AddQuestion/>} />
            <Route path={DefaultRoutes.ShowQuestions} element={<ShowQuestions/>} />
        </Routes>
    </Router>
  );
}
