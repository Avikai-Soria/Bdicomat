import { useState } from "react";

import testLogo from "../../assets/img/test_logo.svg";
import jenkinsLogo from "../../assets/img/jenkins_logo.svg";
import playWrightLogo from "../../assets/img/playwright_logo.svg";
import pyTestLogo from "../../assets/img/Pytest_logo.svg";
import seleniumLogo from "../../assets/img/selenium_logo.svg";
import sing_in_main_logo from "../../assets/img/sing_in_main_logo.svg";
import sing_up_main_logo from "../../assets/img/sing_up_main_logo.svg";

import "../../style_files/SignInSignUpContainer.css";

export default function SignInSignUpContainer() {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  const [signIn, toggle] = useState(true);
  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="testing-text">New! integration with the most powerfully testing frameworks:</p>
              <div className="testing-media">
                <img src={jenkinsLogo} className="testing-icon" alt="" />
                <img src={playWrightLogo} className="testing-icon" alt="" />
                <img src={pyTestLogo} className="testing-icon" alt="" />
                <img src={seleniumLogo} className="testing-icon" alt="" />
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img
              src={sing_in_main_logo}
              className="image"
              alt=""
              height="500"
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={sing_up_main_logo} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
