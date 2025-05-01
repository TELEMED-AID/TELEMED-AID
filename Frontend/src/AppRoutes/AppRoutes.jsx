// Description: This file contains the routes for the application.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as DefaultRoutes from "../AppRoutes/DefaultRoutes";
import { useTheme } from "@mui/material/styles";

export default function Paths() {
  const theme = useTheme();
  return (
    <Router></Router>
  );
}
