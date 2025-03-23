import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

import './Login.css';
import 'boxicons/css/boxicons.min.css';
import google from '../../images/google.png'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className='body-container'>
        <div className="container" style={{padding: "25px 35px 35px 35px"}}>
          <header>Login Form</header>
          
          <div className="form-outer">
              <form>
                      <div className={`page active`}>

                              <>
                                  <div className="field">
                                      <div className="label">Username</div>
                                      <input type="email" required onChange={(e) => setUsername(e.target.value)}/>
                                  </div>
                                  <div className="field">
                                      <div className="label">Password</div>
                                      <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                                  </div>
                                  <div className="field btns">
                                      <button type="submit" className="submit">LOGIN</button>
                                  </div>
                                  <div class="form-link">
                                    <span>Don't have an account? <Link to="/register" className="link signup-link">Signup</Link></span>
                                  </div>

          <div class="line"></div>
        <div class="media-options">
          <a href="#" class="field facebook">
          <i className="bx bxl-facebook facebook-icon"></i>
            <span>Login with Facebook</span>
          </a>
        </div>
        <div class="media-options">
          <a href="#" class="field google" style={{marginTop: "20px"}}>
            <img src={google} alt="" className="google-img" />
            <span>Login with Google</span>
          </a>
        </div>
                              </>
                          
                      </div>

              </form>
          </div>
      </div>
    </div>
);
}

export default Login;
