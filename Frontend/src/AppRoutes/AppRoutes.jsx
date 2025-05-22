// Description: This file contains the routes for the application.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as DefaultRoutes from "../AppRoutes/DefaultRoutes";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Home_page from "../Pages/Home_page/Home_page";
import UpdateInfo from "../Pages/UpdateInfo/UpdateInfo";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";

export default function Paths() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={DefaultRoutes.Login} element={<Login />} />
            <Route path={DefaultRoutes.Signup} element={<Signup />} />
            <Route path={DefaultRoutes.home} element={<Home_page />} />
            <Route path={DefaultRoutes.updateInfo} element={<UpdateInfo role={"doctor"} />} />
            <Route path={DefaultRoutes.updatePassword} element={<UpdatePassword role={"doctor"} />} />
        </Routes>
    </Router>
  );
}
