import { useState } from "react";

const Homepage = ({}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")


  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
    setIsNextClicked(false);
    setUsername("");
    setPassword(""); //Maxi är best
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNextClick = () => {
    setIsNextClicked(true);
  };

  const handleLoginSubmit = () => {
    handleLoginClose();
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  }

  const handleRegisterClose = () => {
    setShowRegister(false);
    setShowLogin(false);
    setRegisterUsername("");
    setRegisterPassword("");
  };


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
              {!isNextClicked && (
                <button onClick={handleNextClick}>Next</button>
              )}
              {isNextClicked && (
                <>
                  <input
                    placeholder="Lösenord"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button onClick={handleLoginSubmit}>Log in</button>
                </>
              )}
              <p>Har du inget konto? <a className="link" href="#">Registrera dig</a></p> 
            </div>
          </div>
        </div>
      )}
      {showRegister && (
        <div className="login-modal-wrapper">
          <div className="login-modal-content">
            <span className="register-close" onClick={handleRegisterClose}>
              &times;
            </span>
            <h2 className="center">Register your account</h2>
            <div className="content-login">
              <input
                placeholder="Username"
                type="text"
                id="register-username"
                name="username"
                value={registerUsername}
                onChange={handleUsernameChange}
              />
                  <input
                    placeholder="Password"
                    type="password"
                    id="register-password"
                    name="password"
                    value={registerPassword}
                    onChange={handlePasswordChange}
                  />
                    <input
                    placeholder="Verify password"
                    type="password"
                    id="verify-password"
                    name="password"
                    value={registerPassword}
                    onChange={handlePasswordChange}
                  />
                  <button onClick={handleLoginSubmit}>Register</button>
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
            <button className="register-btn-footer" onClick={handleRegisterClick}>Register</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;