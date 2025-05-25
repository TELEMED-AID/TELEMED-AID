// Description: This file contains the routes for the application.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as DefaultRoutes from "../AppRoutes/DefaultRoutes";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import RoomCreationPopup  from "../Pages/RoomCreationPopup/RoomCreationPopup ";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
export default function Paths() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={DefaultRoutes.Login} element={<Login />} />
            <Route path={DefaultRoutes.Signup} element={<Signup />} />
            <Route path={DefaultRoutes.roomCreation} element={<RoomCreationPopup />} />
            <Route path={DefaultRoutes.profile} element={<ProfilePage userRole="DOCTOR" />} />
        </Routes>
    </Router>
  );
}
