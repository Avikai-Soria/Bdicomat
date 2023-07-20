import "./App.css";
import SignInSignUpComponent from "./components/signIn_signUp/SignInSignUpComponent";
import { BrowserRouter } from "react-router-dom";
import MainPageContainer from "./components/main_page/MainPageContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainPageContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
