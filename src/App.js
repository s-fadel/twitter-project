import "./style.css";
import { useState, useEffect } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Trending from "./Trending";
import Dashboard from "./Dashboard";

export const localStorageKey = "Twitter_project";

const App = () => {
  const [view, setView] = useState("HOME");
  const [selectedUser, setSelectedUser] = useState("");

  switch (view) {
    case "DASHBOARD":
      return <Dashboard setSelectedUser={setSelectedUser} setView={setView} />;
    case "HOME":
      return <Home setView={setView} />;
    case "PROFILE":
      return <Profile setSelectedUser={setSelectedUser} selectedUser={selectedUser} setView={setView} />;
    default:
      return <Trending setView={setView} />;
  }
};

export default App;
