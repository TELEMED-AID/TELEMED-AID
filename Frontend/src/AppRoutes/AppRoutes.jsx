// Description: This file contains the routes for the application.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as DefaultRoutes from "../AppRoutes/DefaultRoutes";
import { useTheme } from "@mui/material/styles";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

export default function Paths() {
  const theme = useTheme();

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path={DefaultRoutes.Login} element={<Login />} />
            <Route path={DefaultRoutes.Signup} element={<Signup />} />
        </Routes>
    </Router>
  );
}
