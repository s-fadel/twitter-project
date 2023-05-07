import "./style.css";
import { useState, useEffect } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Trending from "./Trending";
import Register from "./Register";
import Dashboard from "./Dashboard";

const App = () => {
  const [view, setView] = useState("DASHBOARD");

  switch (view) {
    case "DASHBOARD":
      return <Dashboard setView={setView} />;
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
