
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePopup.css";

function WelcomePopup({ onClose, onBookAppointment }) {
    const [showReception, setShowReception] = useState(false);
    const navigate = useNavigate();

    // Temporary receptionist number — replace it later.
    const RECEPTION_PHONE = "9876543210";

    // Open the existing appointment modal
    const handleBookAppointment = () => {
        onClose();
        onBookAppointment(null);
    };

    // Navigate to existing website pages
    const handleNavigate = (path) => {
        onClose();
        navigate(path);
    };

    // Welcome popup options
    const options = [
        {
            icon: "📞",
            title: "Contact Receptionist",
            description: "Get help from our hospital reception.",
            action: () => setShowReception(true),
        },
        {
            icon: "📅",
            title: "Book an Appointment",
            description: "Schedule a visit with a doctor.",
            action: handleBookAppointment,
        },
        {
            icon: "🩺",
            title: "Find a Doctor",
            description: "Explore our doctors and specialists.",
            action: () => handleNavigate("/doctors"),
        },
        {
            icon: "🏥",
            title: "Hospital Information",
            description: "Learn more about our hospital.",
            action: () => handleNavigate("/about"),
        },
    ];

    return (
        <div
            className="welcome-overlay"
            onClick={onClose}
        >
            <div
                className="welcome-popup"
                role="dialog"
                aria-modal="true"
                aria-labelledby="welcome-title"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="welcome-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Close welcome popup"
                >
                    &times;
                </button>

                {/* Welcome header */}
                <div className="welcome-header">
                    <div className="welcome-icon">🏥</div>

                    <h2 id="welcome-title">
                        Welcome to Mediyog Hospital
                    </h2>

                    <p>How can we help you today?</p>
                </div>

                {/* Receptionist contact section */}
                {showReception ? (
                    <div className="reception-info">
                        <div className="reception-icon">📞</div>

                        <h3>Contact Our Reception</h3>

                        <p>
                            Call our reception for appointments
                            and general enquiries.
                        </p>

                        <a
                            className="welcome-call"
                            href={`tel:${RECEPTION_PHONE}`}
                        >
                            Call Reception: {RECEPTION_PHONE}
                        </a>

                        {/* Back to options button */}
                        <div>
                            <button
                                className="welcome-back"
                                type="button"
                                onClick={() => setShowReception(false)}
                            >
                                ← Back to Options
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Main welcome menu */
                    <div className="welcome-options">
                        {options.map((option) => (
                            <button
                                className="welcome-option"
                                key={option.title}
                                type="button"
                                onClick={option.action}
                            >
                                <span className="option-icon">
                                    {option.icon}
                                </span>

                                <span className="option-content">
                                    <strong>{option.title}</strong>
                                    <small>{option.description}</small>
                                </span>

                                <span
                                    className="option-arrow"
                                    aria-hidden="true"
                                >
                                    &#8250;
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <p className="welcome-footer">
                    Your health and well-being matter to us.
                </p>
            </div>
        </div>
    );
}

export default WelcomePopup;
