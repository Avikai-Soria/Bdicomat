import { useState } from "react";

import SignInSignUpContainer from "./SignInSignUpContainer";
import SignInSignUpPanel from "./SignInSignUpPanel";



import "../../style_files/SignInSignUpContainer.css";

export default function SignInSignUpComponent() {

  function transparentSignUp() {
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
  }

  function transparentSignIn() {
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode");
  }

  const [signIn, toggle] = useState(true);
  return (
    <>
      <div className="container">
        <SignInSignUpContainer />
        <SignInSignUpPanel
          transparentSignIn={transparentSignIn}
          transparentSignUp={transparentSignUp}
        />
      </div>
    </>
  );
}
