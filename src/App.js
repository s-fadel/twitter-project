import "./style.css";
import { useState, useEffect } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Trending from "./Trending";
import Register from "./Register";

const App = () => {
  const localStorageKey = "Twitter_project";

  const [view, setView] = useState("HOME");

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify());
  }, []);

  switch (view) {
    case "HOME":
      return <Home setView={setView} />;
    case "PROFILE":
      return <Profile setView={setView} />;
    case "LOGIN":
      return <Register setView={setView} />;
    default:
      return <Trending setView={setView} />;
  }
};

export default App;
