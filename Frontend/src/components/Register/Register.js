import React, { useState, useEffect } from 'react';

import './Register.css';

function Register() {
    const [currentStep, setCurrentStep] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    // Check if passwords match whenever they change
    useEffect(() => {
        if (password === confirmPassword && password.length > 0) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }, [password, confirmPassword]);

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordsMatch) {
            alert("Your Form Successfully Signed up");
            window.location.reload();
        } else {
            alert("Passwords do not match. Please correct them.");
        }
    };

    return (
        <div className="container">
            <header>Signup Form</header>
            <div className="progress-bar">
                {["Name", "Contact", "Birth", "Submit"].map((label, index) => (
                    <div className="step" key={index}>
                        <p className={currentStep > index ? "active" : ""}>{label}</p>
                        <div className={`bullet ${currentStep > index ? "active" : ""}`}>
                            <span>{index + 1}</span>
                        </div>
                        <div className={`check fas fa-check ${currentStep > index ? "active" : ""}`}></div>
                    </div>
                ))}
            </div>
            <div className="form-outer">
                <form onSubmit={handleSubmit}>
                    {[0, 1, 2, 3].map((step) => (
                        <div key={step} className={`page ${currentStep === step ? "active" : "hidden"}`}>
                            {step === 0 && (
                                <>
                                    <div className="title">Basic Info:</div>
                                    <div className="field">
                                        <div className="label">First Name</div>
                                        <input type="text" required />
                                    </div>
                                    <div className="field">
                                        <div className="label">Last Name</div>
                                        <input type="text" required />
                                    </div>
                                    <div className="field">
                                        <button type="button" onClick={nextStep} className="next">Next</button>
                                    </div>
                                </>
                            )}
                            {step === 1 && (
                                <>
                                    <div className="title">Contact Info:</div>
                                    <div className="field">
                                        <div className="label">Email Address</div>
                                        <input type="email" required />
                                    </div>
                                    <div className="field">
                                        <div className="label">Phone Number</div>
                                        <input type="tel" required />
                                    </div>
                                    <div className="field btns">
                                        <button type="button" onClick={prevStep} className="prev">Previous</button>
                                        <button type="button" onClick={nextStep} className="next">Next</button>
                                    </div>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="title">Date of Birth:</div>
                                    <div className="field">
                                        <div className="label">Date</div>
                                        <input type="date" required />
                                    </div>
                                    <div className="field">
                                        <div className="label">Gender</div>
                                        <select required>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="field btns">
                                        <button type="button" onClick={prevStep} className="prev">Previous</button>
                                        <button type="button" onClick={nextStep} className="next">Next</button>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
    <>
        <div className="title">Login Details:</div>
        <div className="field">
            <div className="label">Username</div>
            <input type="text" required />
        </div>
        <div className="field">
            <div className="label">Password</div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className="field">
            <div className="label">Confirm Password</div>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            {!passwordsMatch && (confirmPassword.length >= 0 && password.length != 0) && (
                <div className="error-message" style={{ color: "red", fontSize: "14px" }}>
                    X
                </div>
            )}
        </div>
        <div className="field btns">
            <button type="button" onClick={prevStep} className="prev">Previous</button>
            <button onClick={handleSubmit}
                type="submit"
                className="submit"
                disabled={!passwordsMatch || password.length === 0 || confirmPassword.length === 0}
            >
                Submit
            </button>
        </div>
    </>
)}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default Register;
