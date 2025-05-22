import React from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import chatImg from "../../Assets/chat.png";
import appointmentImg from "../../Assets/Appointment.png";
import articlesImg from "../../Assets/articles.png";
import availabilityImg from "../../Assets/availability.png";
import doctorsImg from "../../Assets/doctors.png";
import voteImg from "../../Assets/vote.png";
import questionsImg from "../../Assets/questions.png";
import Navbar from "../../Components/Navbar/Navbar"; // Adjust path as needed
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
const features = [
    {
        title: "Easy Signup & Login",
        description:
            "New users can quickly register as patients or doctors. The system provides a secure and user-friendly authentication process to ensure safe access to personal healthcare data.",
        image: doctorsImg,
        route: "/signup",
    },
    {
        title: "Book Appointments",
        description:
            "Patients can view doctor availability and schedule appointments that fit both their preferences and the doctor’s open time slots. The booking system ensures there are no overlaps or conflicts.",
        image: appointmentImg,
        route: "/appointments",
    },
    {
        title: "Doctor Availability Management",
        description:
            "Doctors have full control over their working hours. They can set, update, or remove their available time slots, helping patients find the right time for consultation effortlessly.",
        image: availabilityImg,
        route: "/availability",
    },
    {
        title: "Post Health Questions",
        description:
            "Patients can post detailed medical or wellness-related questions. These are publicly visible to registered doctors, encouraging community-based knowledge sharing and support.",
        image: questionsImg,
        route: "/questions",
    },
    {
        title: "Doctor Answers & Voting System",
        description:
            "Doctors can respond to patient questions and vote on other doctors' answers to highlight the most helpful responses. This peer-review approach helps patients trust the best advice.",
        image: voteImg,
        route: "/answers",
    },
    {
        title: "Publish Medical Articles",
        description:
            "Doctors can share their expertise by posting health-related articles. These articles help educate patients and establish the doctor’s credibility within the platform.",
        image: articlesImg,
        route: "/articles",
    },
    {
        title: "Live Chat During Appointments",
        description:
            "At the time of the appointment, patients and doctors can engage in real-time chat. This feature allows efficient remote consultations without the need for physical visits.",
        image: chatImg,
        route: "/chat",
    },
];

const FeatureCard = ({ feature, isReversed }) => {
    const [ref, inView] = useInView({
        triggerOnce: false, // Changed to false to trigger on both scroll directions
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Card
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: isReversed ? "row-reverse" : "row",
                    mb: 10,
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                }}
            >
                {/* Image */}
                <Box sx={{ width: "50%" }}>
                    <img
                        src={feature.image}
                        alt={feature.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                {/* Text */}
                <Box
                    sx={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <CardContent
                        sx={{
                            ml: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontFamily: "'Roboto', sans-serif", // Default MUI font
                                fontWeight: 700,
                            }}
                        >
                            {feature.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                            sx={{
                                fontSize: "20px",
                            }}
                        >
                            {feature.description}
                        </Typography>
                        <Button
                            variant="contained"
                            href={feature.route}
                            sx={{
                                fontSize: "20px",
                                mt: 2,
                                backgroundColor: "#33b4d4",
                                "&:hover": {
                                    backgroundColor: "#2a96b3",
                                },
                            }}
                        >
                            {feature.title}
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </motion.div>
    );
};

const Home_page = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Container sx={{ mt: 10, p: 0 }}>
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                        isReversed={index % 2 !== 0}
                    />
                ))}
            </Container>
        </>
    );
};

export default Home_page;
