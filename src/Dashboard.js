import React, { useState, useEffect } from "react";

import "./dashboard.css";

const Dashboard = ({ setView }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("Twitter_project");

    setView("HOME");

    setShowPopup(false);
  };

  // Get local storage and find logged-in user
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Twitter_project"));
    if (storedData) {
      const loggedUser = storedData.find((user) => user.isLoggedIn);
      setCurrentUser(loggedUser.username);
    }
  }, []);

  // Få local storage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  // Updaterar local storag när post state ändras
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Hantera submit och skapa en ny post
  const handleSubmit = (event) => {
    //Jag lägger till data till posts (MAXIMUS)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      username: currentUser,
      content: formData.get("content"),
      date: formattedDate,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };
    setPosts([newPost, ...posts]);
  };

  // Konvererar hashtags till clickbara länkar
  const renderHashtags = (text) => {
    const regex = /#(\w+)/g;
    return text.replace(regex, '<a href="/search?q=$1">#$1</a>');
  };

  return (
    <div className="dashboard">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button onClick={handleConfirmLogout}>Logout</button>
              <button id="c" onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Vänster sidofält */}
      <div className="left-sidebar">
        <div className="menu-container">
          <div className="profil-holder">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>{" "}
            <a href="#" onClick={() => setView("PROFILE")}>
              @{currentUser}
            </a>
          </div>

          <button id="logout" onClick={handleLogout}>
            Logga ut
          </button>
        </div>
      </div>

      {/* Flödeskomponent */}
      <div className="feed">
        {/* Filter */}
        <div className="filter">
          <h2>Home</h2>
        </div>

        {/* Nytt inläggskontainer */}
        <div className="new-post-container">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <form onSubmit={handleSubmit}>
            <textarea
              maxLength="140"
              minLength="1"
              name="content"
              placeholder="What's happening?"
            ></textarea>

            {/* Verktygsrad för inlägg */}
            <div className="post-tools">
              <input type="submit" value="Tweet" />
            </div>
          </form>
        </div>

        {/* För dig-sektion */}
        <center>
          <p style={{ height: "30px", borderBottom: "1px solid #eee" }}>
            For You
          </p>
        </center>

        {/* Inläggskontainer */}
        {posts.map((post, index) => (
          <div className="post-container" key={index}>
            <div className="text-container">
              <a href="#" onClick={() => setView("PROFILE")}>
                {post.username}
              </a>
              <p
                dangerouslySetInnerHTML={{
                  __html: renderHashtags(post.content),
                }}
              ></p>
              <label className="date-label"> {post.date}</label>
            </div>
            {post.image && <img src={post.image} alt="image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
