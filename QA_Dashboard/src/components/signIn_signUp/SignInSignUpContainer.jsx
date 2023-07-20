function SignInSignUpContainer() {
  return (
    <>
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
            <p className="testing-text">
              New! integration with the most powerfully testing frameworks:
            </p>
            <div className="testing-media">
              <img className="playWrightLogo testing-icon" alt="" />
              <img className="pyTestLogo testing-icon" alt="" />
              <img className="seleniumLogo testing-icon" alt="" />
              <img className="cypressLogo testing-icon" alt="" />
              <img className="testCafeLogo testing-icon" alt="" />
              <img className="junitLogo testing-icon" alt="" />
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
            <p className="testing-text">
              We are trusted by the most famous companies:
            </p>
            <div className="testing-media">
              <img className="metaLogo testing-icon" alt="" />
              <img className="googleLogo testing-icon" alt="" />
              <img className="amazonLogo testing-icon" alt="" />
              <img className="appleLogo testing-icon" alt="" />
              <img className="microsoftLogo testing-icon" alt="" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignInSignUpContainer;
