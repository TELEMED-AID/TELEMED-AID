// Description: This file contains the routes for the application.
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import * as DefaultRoutes from "../AppRoutes/DefaultRoutes";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AddArticle from "../Pages/Article/AddArticle";
import ShowArticles from "../Pages/Article/ShowArticles";
import AddQuestion from "../Pages/Question/AddQuestion";
import ShowQuestions from "../Pages/Question/ShowQuestions";
import RoomCreationPopup from "../Pages/RoomCreationPopup/RoomCreationPopup ";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Home_page from "../Pages/Home_page/Home_page";
import UpdateInfo from "../Pages/UpdateInfo/UpdateInfo";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";
import Availability from "../Pages/Availability/Availability";
import MyAppointments from "../Pages/MyAppointments/MyAppointments";
import Appointment from "../Pages/Appointment/Appointment";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import ChatPage from "../Pages/ChatPage/ChatPage";
import { sampleAppointments } from "../Utils/HelperObjects";

export default function Paths() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path={DefaultRoutes.Login} element={<Login />} />
                <Route path={DefaultRoutes.Signup} element={<Signup />} />
                <Route
                    path={DefaultRoutes.roomCreation}
                    element={<RoomCreationPopup />}
                />
                <Route
                    path={DefaultRoutes.profile}
                    element={<ProfilePage userRole="DOCTOR" />}
                />
                <Route path={DefaultRoutes.home} element={<Home_page />} />
                <Route
                    path={DefaultRoutes.updateInfo}
                    element={<UpdateInfo role={"doctor"} />}
                />
                <Route
                    path={DefaultRoutes.updatePassword}
                    element={<UpdatePassword role={"doctor"} />}
                />
                <Route
                    path={DefaultRoutes.availability}
                    element={<Availability />}
                />
                <Route
                    path={DefaultRoutes.myAppointments}
                    element={
                        <MyAppointments appointments={sampleAppointments} />
                    }
                />
                <Route
                    path={DefaultRoutes.bookAppointment}
                    element={<Appointment />}
                />
                <Route
                    path={DefaultRoutes.chat}
                    element={<ChatPage />}
                />
                <Route path={DefaultRoutes.AddArticle} element={<AddArticle />} />
                <Route path={DefaultRoutes.ShowArticles} element={<ShowArticles />} />
                <Route path={DefaultRoutes.AddQuestion} element={<AddQuestion/>} />
                <Route path={DefaultRoutes.ShowQuestions} element={<ShowQuestions/>} />
                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}
