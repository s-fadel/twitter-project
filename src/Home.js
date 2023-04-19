import { useState } from "react";

const Homepage = ({}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNextClick = () => {};

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
      </div>

      {/* Popup-rutan */}
      {showLogin && (
        <div className="login-modal-wrapper">
          <div className="login-modal-content">
            <span className="login-close" onClick={handleLoginClose}>
              &times;
            </span>
            <h2 className="center">Log in on Twitter</h2>
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
              <p>Har du inget konto? Registrera dig</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="content-wrapper">
          <ul className="nav-links"></ul>
          <div className="nav-buttons">
            <button className="login-btn-footer" onClick={handleLoginClick}>Log in</button>
            <button>Register</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
