import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";

import './Register.css';

function Register() {
    const [currentStep, setCurrentStep] = useState(0);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [date, setDate] = useState("");
    const [dobError, setDobError] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordsMatchError, setPasswordsMatchError] = useState("");
    
    
    const basicInfo = () => {
        if(fName.length === 0 || lName.length === 0){
            Swal.fire({
                icon: "error",
                title: "Incomplete Basic Info",
                text: "Please enter firstname and lastname!",
            });
        }
        else{
            if (currentStep < 3) setCurrentStep(currentStep + 1);
        }
    }
    const Contactnfo = () => {
        if(email.length === 0 || phone.length === 0){
            Swal.fire({
                icon: "error",
                title: "Incomplete Contact Info",
                text: "Please enter valid Email and Phone Number!",
            });
        }
        else{
            if (currentStep < 3) setCurrentStep(currentStep + 1);
        }
    }
    const personalInfo = () => {
        if(date.length === 0 || gender.length === 0){
            Swal.fire({
                icon: "error",
                title: "Incomplete Personal Info",
                text: "Please enter valid date of birth and gender!",
            });
        }
        else{
            if (currentStep < 3) setCurrentStep(currentStep + 1);
        }
    }
    const validateDob = (e) => {
        const dobValue = e.target.value;
        setDate(dobValue);
    
        // Check if the date is a future date
        const today = new Date();
        let selectedDate = new Date(dobValue); // Use 'let' here to allow reassignment
    
        if (selectedDate > today) {
            setDobError("Date of birth cannot be in the future.");
            return;
        }
    
        // Check if the user is 18 years or older
        let age = today.getFullYear() - selectedDate.getFullYear(); // Let age be a variable that can change
        const monthDifference = today.getMonth() - selectedDate.getMonth();
    
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < selectedDate.getDate())) {
            age--; // If the birthdate hasn't occurred yet this year
        }
    
        if (age < 18) {
            setDobError("You must be at least 18 years old.");
        } else {
            setDobError(""); // Clear the error if age is valid
        }
    };

    const validatePhone = (phoneValue) => {
        setPhone(phoneValue);
        
        if (!phoneValue) {
            setPhoneError("Please enter your phone number.");
        } else if (!/^\+?[1-9]\d{1,14}$/.test(phoneValue)) { // Regex to validate international phone number format
            setPhoneError("Please enter a valid phone number.");
        } else {
            setPhoneError("");
        }
    };


    const validateUsername = (e) => {
        const usernameValue = e.target.value;
        setUsername(usernameValue);

        // Regex for valid username format: 
        // - At least 3 characters long
        // - Only alphanumeric characters, underscore, and dot are allowed
        // - Max length of 16 characters
        const usernameRegex = /^[a-zA-Z0-9._]{3,16}$/;

        if (usernameValue.length > 0 && !usernameRegex.test(usernameValue)) {
            setUsernameError("Username must be between 3 and 16 characters and can only contain letters, numbers, periods, or underscores.");
        } else {
            setUsernameError("");
        }
    };

    const validatePassword = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        // Updated regex to allow underscore (_) as a valid special character
        const minLength = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_])[A-Za-z\d!@#$%^&*()_]{8,}$/;

        if (passwordValue.length!=0 && !minLength.test(passwordValue)) {
            setPasswordError(
                "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
            );
        } else {
            setPasswordError("");
        }
    };

    useEffect(() => {
        if (password === confirmPassword && password.length > 0) {
            setPasswordsMatch(true);
            setPasswordsMatchError("")
        } else {
            setPasswordsMatch(false);
            setPasswordsMatchError("password doesn't match")
        }
    }, [password, confirmPassword]);

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(emailError || phoneError || dobError || usernameError || passwordError || passwordsMatchError ){
            Swal.fire({
                icon: "error",
                title: "Can't submit",
                text: "Please check the validity of entered data!",
            });
        }
        else{
            Swal.fire({
                icon: "success",
                title: "Successfully Signed Up",
                text: "You have successfully signed up. Welcome!",
            });
        }
    };

    const validateEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            setEmailError("Invalid email format");
            
        } else {
            setEmailError("");
        }
    };

    return (
        <div className='body-container'>
            <div className="container">
                <header>Signup Form</header>
                <div class="form-link">
                    <span>Already have an account? <Link to="/" className="link signup-link">Login</Link></span>
                </div>
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
                                            <input type="text" required onChange={(e) => setfName(e.target.value)} />
                                        </div>
                                        <div className="field">
                                            <div className="label ">Last Name</div>
                                            <input type="text" required onChange={(e) => setlName(e.target.value)} />
                                        </div>
                                        <div className="field">
                                            <button type="button" onClick={basicInfo} className="next">Next</button>
                                        </div>
                                    </>
                                )}
                                {step === 1 && (
                                    <>
                                    <div className="title">Contact Info:</div>
                                    <div className="field">
                                        <div className="label">Email Address</div>
                                        <input 
                                            type="email" 
                                            value={email} 
                                            onChange={validateEmail} 
                                            required 
                                        />
                                    </div>
                                    {email.length > 0 && emailError && <div style={{ color: 'red', fontSize: "10px", marginTop: "5px"}}>{emailError}</div>}
                                    <div className="field">
                                        <div className="label" >Phone Number</div>
                                        <PhoneInput
                                            value={phone}
                                            onChange={validatePhone}
                                            international
                                            required
                                            inputStyle={{ width: "100%", paddingLeft: "50px" }}
                                        />
                                    </div>
                                    {phoneError && <div style={{ color: 'red', fontSize: "10px", marginTop: "5px"}}>{phoneError}</div>}
                                        <div className="field btns">
                                            <button type="button" onClick={prevStep} className="prev">Previous</button>
                                            <button type="button" onClick={Contactnfo} className="next" disabled={emailError}>Next</button>
                                        </div>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <div className="title">Personal Info:</div>
                                        <div className="field">
                                            <div className="label">Date</div>
                                            <input type="date" required onChange={validateDob}/>
                                        </div>
                                        {dobError && <div style={{ color: 'red', fontSize: "10px"}}>{dobError}</div>}
                                        <div className="field">
                                            <div className="label">Gender</div>
                                            <select required onChange={(e) => setGender(e.target.value)}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <div className="label">Role</div>
                                            <select required onChange={(e) => setRole(e.target.value)}>
                                            <option value="" >Select Role</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="patient">Patient</option>
                                            <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="field btns">
                                            <button type="button" onClick={prevStep} className="prev">Previous</button>
                                            <button type="button" onClick={personalInfo} className="next">Next</button>
                                        </div>
                                    </>
                                )}
                                {step === 3 && (
        <>
            <div className="title">Credentials:</div>
            <div className="field">
                <div className="label">Username</div>
                <input type="text" required onChange={validateUsername} value={username}/>
            </div>
            {usernameError && <div style={{ color: 'red', fontSize: "10px"}}>{usernameError}</div>}
            <div className="field">
                <div className="label">Password</div>
                <input
                    type="password"
                    value={password}
                    onChange={validatePassword}
                    required
                />
            </div>
            {passwordError && <div style={{ color: 'red', fontSize: "10px"}}>{passwordError}</div>}
            <div className="field">
                <div className="label">Confirm Password</div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            {!passwordsMatch && (confirmPassword.length >= 0 && password.length !== 0) && (
                    <div style={{ color: 'red', fontSize: "10px"}}>{passwordsMatchError}</div>
                )}
            <div className="field btns">
                <button type="button" onClick={prevStep} className="prev">Previous</button>
                <button onClick={handleSubmit}
                    type="submit"
                    className="submit"
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
        </div>
    );
}

export default Register;
