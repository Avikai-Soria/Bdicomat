import sing_in_main_logo from "../../assets/img/sing_in_main_logo.svg";
import sing_up_main_logo from "../../assets/img/sing_up_main_logo.svg";

function SignInSignUpPanel({ transparentSignIn, transparentSignUp }) {
  return (
    <>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Welcome to AutoTesting! Join today thousands of satisfied
              customers who are using our platform to visualize their QA
              processes.
            </p>
            <button
              onClick={() => transparentSignUp()}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={sing_in_main_logo} className="image" alt="" height="500" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>For an easy and secure connection, click here.</p>
            <button
              onClick={() => transparentSignIn()}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={sing_up_main_logo} className="image" alt="" />
        </div>
      </div>
    </>
  );
}

export default SignInSignUpPanel;
