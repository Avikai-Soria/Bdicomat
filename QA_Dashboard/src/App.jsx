import "./App.css";
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
