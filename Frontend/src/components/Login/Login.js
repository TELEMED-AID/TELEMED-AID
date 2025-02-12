import './Login.css';
import 'boxicons/css/boxicons.min.css';
import google from '../../images/google.png'
function Login() {
  return (
    <div className="container" style={{padding: "25px 35px 35px 35px"}}>
        <header>Login Form</header>
        
        <div className="form-outer">
            <form>
                    <div className={`page active`}>

                            <>
                                <div className="field">
                                    <div className="label">Username</div>
                                    <input type="email" required />
                                </div>
                                <div className="field">
                                    <div className="label">Password</div>
                                    <input type="tel" required />
                                </div>
                                <div className="field btns">
                                    <button type="submit" className="submit">LOGIN</button>
                                </div>
                                <div class="form-link">
          <span>Don't have an account? <a href="#" className="link signup-link">Signup</a></span>
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
);
}

export default Login;
