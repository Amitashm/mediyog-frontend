
import { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/About/About.jsx";
import Doctors from "./components/doctors/Doctors.jsx";
import Departments from "./components/departments/Departments.jsx";
import Services from "./components/services/Services.jsx";
import Footer from "./components/footer/footer.jsx";

import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

import AppointmentModal from "./components/AppointmentModal/AppointmentModal.jsx";
import WelcomePopup from "./components/WelcomePopup/WelcomePopup.jsx";

import "./App.css";

// --------------------------------------------------
// SECURE PROTECTED ROUTE GUARD (10-Min Expiration)
// --------------------------------------------------
const ProtectedRoute = ({ children }) => {
    const isAuthenticated =
        localStorage.getItem("isAdminAuthenticated") === "true";

    const sessionExpiry = parseInt(
        localStorage.getItem("sessionExpiry") || "0",
        10
    );

    const now = Date.now();

    if (!isAuthenticated || now > sessionExpiry) {
        localStorage.removeItem("isAdminAuthenticated");
        localStorage.removeItem("sessionExpiry");

        return <Navigate to="/admin" replace />;
    }

    return children;
};

function App() {
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Welcome popup appears whenever the app is opened or refreshed
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

    // Open appointment modal
    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setIsAppointmentOpen(true);
    };

    // Close appointment modal
    const handleCloseAppointment = () => {
        setIsAppointmentOpen(false);
        setSelectedDoctor(null);
    };

    return (
        <Router>
            <div className="app-wrapper">
                <Header />

                {/* Welcome Popup */}
                {isWelcomeOpen && (
                    <WelcomePopup
                        onClose={() => setIsWelcomeOpen(false)}
                        onBookAppointment={handleBookAppointment}
                    />
                )}

                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    onBookAppointment={handleBookAppointment}
                                />
                            }
                        />

                        <Route
                            path="/doctors"
                            element={
                                <Doctors
                                    onBookAppointment={handleBookAppointment}
                                />
                            }
                        />

                        <Route
                            path="/departments"
                            element={<Departments />}
                        />

                        <Route
                            path="/services"
                            element={<Services />}
                        />

                        <Route
                            path="/about"
                            element={<About />}
                        />

                        <Route
                            path="/admin"
                            element={<AdminLogin />}
                        />

                        {/* Secured Admin Dashboard Route */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>

                <Footer
                    onBookAppointment={() => handleBookAppointment(null)}
                />

                {/* Existing Appointment Modal */}
                <AppointmentModal
                    isOpen={isAppointmentOpen}
                    onClose={handleCloseAppointment}
                    doctor={selectedDoctor}
                />
            </div>
        </Router>
    );
}

export default App;
