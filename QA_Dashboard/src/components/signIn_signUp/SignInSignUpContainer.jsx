import { useState } from "react";

function SignInSignUpContainer({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleLogin = async function (event) {
    event.preventDefault();
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

  const handleSignUp = async function (event) {
    event.preventDefault();

    // Perform validations
    if (!newUsername || !newPassword || !newName || !newEmail) {
      alert("All fields except address are required.");
      return;
    }

    if (/^\d/.test(newUsername)) {
      alert("Username should not start with a number.");
      return;
    }

    if (newPassword.length < 4) {
      alert("Password should be at least 4 characters long.");
      return;
    }

    // Create a user object with the gathered attributes
    const user = {
      username: newUsername,
      password: newPassword,
      name: newName,
      email: newEmail,
      address: newAddress,
    };

    // Make the POST request to localhost:2999/users
    fetch("http://localhost:2999/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Username or email already exists");
        }
      })
      .then((data) => {
        // Handle the response data
        console.log("User created:", data);

        alert("User was created successfully");
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error creating user:", error);
        // Display an error message to the user
        alert(error.message);
      });
  };

  return (
    <>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleLogin}>
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
            <button className="btn solid">Login</button>
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
          <form action="#" className="sign-up-form" onSubmit={handleSignUp}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => setNewUsername(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(event) => setNewName(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="text"
                placeholder="Address"
                onChange={(event) => setNewAddress(event.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Sign up
            </button>
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
