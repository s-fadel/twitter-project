import { useState } from "react";

const Homepage = ({}) => {
  const [showLogin, setShowLogin] = useState(false); 
  const [username, setUsername] = useState(""); 

  // Funktion som öppnar popup-rutan
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  // Funktion som stänger popup-rutan
  const handleLoginClose = () => {
    setShowLogin(false);
  };

  // Funktion som hanterar ändringar i användarnamnsfältet
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNextClick = () => {
    // Här kan du lägga till logik för att kontrollera användarnamnet och eventuellt visa nästa steg i inloggningen
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links"></ul>
        <div className="nav-buttons">
          <button onClick={handleLoginClick}>Log in</button>
          <button>Register</button>
        </div>
      </nav>

      {/* Popup-rutan */}
      {showLogin && (
  
          <div className="login-modal-content">
            <span className="login-close" onClick={handleLoginClose}>
              &times;
            </span>
            <h2 className="center">Log in</h2>
            <div className="content-login">
            <input
            placeholder="Username"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            {/* Nästa-knappen */}
            <button onClick={handleNextClick}>Nästa</button>
          </div>
          </div>
      )}
    </div>
  );
};

export default Homepage;
