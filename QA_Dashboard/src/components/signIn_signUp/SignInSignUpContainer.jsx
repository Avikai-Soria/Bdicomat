import { useState } from "react";

function SignInSignUpContainer({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async function () {
    const user = { username, password };
    try {
      const response = await fetch("http://localhost:2999/apikeys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Handle the successful response here
        console.log("POST request successful");
        const responseData = await response.json(); // Parse the response body as JSON
        const apiKey = responseData.data.apiKey; // Retrieve the API key
        const userId = responseData.data.userId; // Retrieve the user
        alert("Login successful");
        onLogin(userId, apiKey);
      } else {
        console.error("POST request failed");
        alert("Password is incorrect");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Error getting info from server");
    }
  };

  return (
    <>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button onClick={handleLogin} className="btn solid">
              Login
            </button>
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
            <button onClick={handleLogin} className="btn" value="Sign up" />
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
