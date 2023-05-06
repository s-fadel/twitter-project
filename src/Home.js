import { useState } from "react";

const Homepage = ({}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const localStorageKey = "Twitter_project";

  const createUser = () => {
    const user = {
      username: registerUsername,
      password: registerPassword,
      email: registerEmail,
    };
    const existingUsers =
      JSON.parse(localStorage.getItem(localStorageKey)) || [];
    existingUsers.push(user);
    localStorage.setItem(localStorageKey, JSON.stringify(existingUsers));
  };


  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
    setIsNextClicked(false);
    setUsername("");
    setPassword("");
  };


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (username) {
      setIsNextClicked(true);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userList = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const user = userList.length && userList.find((u) => {
      return u.username === username || u.email === username;  // username som användaren skriver in, kan vara email eller användarnamn. Och detta jämförs med email och username frrån localstorage
    });
    if (user && password === user.password) {
      handleLoginClose();
      setLoginError("");
    } else {
      setLoginError("User or password is wrong");
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleRegisterClose = () => {
    setShowRegister(false);
    setShowLogin(false);
    setRegisterUsername("");
    setRegisterPassword("");
    setVerifyPassword("");
    setRegisterEmail("");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError("");
    const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  const userAlreadyExist = users.length && users.find((u) => {
      return u.username === registerUsername || u.email === registerEmail;  
    });

    if(userAlreadyExist) {
      setRegisterError("User already exist");
      return;
    }

    if (registerUsername && registerEmail && registerPassword && verifyPassword && verifyPassword === registerPassword) {
      handleRegisterClose();
      createUser();
    } else {
      setRegisterError("Password is not matched");
    }
  };

  const handleRegisterUsername = (event) => {
    setRegisterUsername(event.target.value);
  };

  const handleRegisterEmail = (event) => {
    setRegisterEmail(event.target.value);
  };

  const handleRegisterPassword = (event) => {
    setRegisterPassword(event.target.value);
  };

  const handleVerifyPassword = (event) => {
    setVerifyPassword(event.target.value);
  };

  return (
    <div className="page-wrapper">
      <div className="content-wrapper"></div>

      {/* Popup-rutan */}

      {showLogin && (
        <div className="login-modal-wrapper">
          <div className="login-modal-content">
            <span className="login-close" onClick={handleLoginClose}>
              &times;
            </span>
            <h2 className="center">Log in on Twitter</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="content-login">
                <input
                  placeholder="Username or email"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
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
                      required
                    />

                    <button type="submit">Log in</button>
                  </>
                )}

                <p>
                  Don't have an account?{" "}
                  <a className="link" onClick={handleRegisterClick}>
                    Register here
                  </a>
                  {loginError && <p className="error-message">{loginError}</p>}
                </p>
              </div>
            </form>
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
            <form onSubmit={handleRegisterSubmit}>
              <div className="content-login">
                <input
                  placeholder="Username"
                  type="text"
                  id="register-username"
                  name="username"
                  value={registerUsername}
                  onChange={handleRegisterUsername}
                />
                <input
                  placeholder="Email"
                  type="text"
                  id="create-email"
                  name="email"
                  value={registerEmail}
                  onChange={handleRegisterEmail}
                />
                <input
                  placeholder="Password"
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerPassword}
                  onChange={handleRegisterPassword}
                />
                <input
                  placeholder="Verify password"
                  type="password"
                  id="verify-password"
                  name="password"
                  value={verifyPassword}
                  onChange={handleVerifyPassword}
                />
                {registerError && <p className="error-message">{registerError}</p>}

                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="content-wrapper">
          <ul className="nav-links"></ul>
          <div className="nav-buttons">
            <button className="login-btn-footer" onClick={handleLoginClick}>
              Log in
            </button>
            <button
              className="register-btn-footer"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
