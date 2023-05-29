import React, { useState, useEffect } from "react";
import { localStorageKey } from "./App";

import "./dashboard.css";

const Dashboard = ({ setView, setSelectedUser }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  const handleConfirmLogout = () => {
    const userList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    for (let i = 0; i < userList.length; i++) {
      if (userList[i].isLoggedIn === true) {
        userList[i].isLoggedIn = false; // Update the isLoggedIn status for the current user
      }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(userList));

    setView("HOME");

    setShowPopup(false);
  };

  // Get posts from local storage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  // Update local storage when post state changes
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Handle submit and create a new post
  const handleSubmit = (event) => {
    const userList = JSON.parse(localStorage.getItem(localStorageKey)) || []; // get users from local storage
    const loggedInUser = userList.length
      ? userList.find((user) => user.isLoggedIn)
      : null; // find logged in user

    // Add data to posts
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      username: loggedInUser ? loggedInUser.username : "",
      content: formData.get("content"),
      date: formattedDate,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    };
    setPosts([newPost, ...posts]);
  };

  // Convert hashtags to clickable links
  const renderHashtags = (text) => {
    const regex = /#(\w+)/g;
    return text.replace(regex, '<a href="/search?q=$1">#$1</a>');
  };

  // Get the logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem(localStorageKey)).find(
    (user) => user.isLoggedIn
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setUserSearchQuery(value);
  };

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) => {
    return post.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter users based on the user search query
  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const filteredUsers = userList.filter((user) => {
      return user.username
        .toLowerCase()
        .includes(userSearchQuery.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  }, [userSearchQuery]);

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
      {/* Left Sidebar */}
      {/* Right Sidebar */}
      <div className="right-sidebar">
        <form action="">
          <input
            className="search-input"
            placeholder="Search for someone or something"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        {userSearchQuery && filteredUsers.length > 0 && (
          <div className="user-list">
            {filteredUsers.map((user, index) => (
              <div key={index}>
                <div className="profile-result">
                  <a
                    className="profile-result"
                    href="#"
                    onClick={() => {
                      setSelectedUser(user.username);
                      setView("PROFILE");
                    }}
                  >
                    {user.username}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="left-sidebar">
        <div className="menu-container">
          <div className="profil-holder">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile"
            />
            <a
              href="#"
              onClick={() => {
                setSelectedUser(loggedInUser.username);
                setView("PROFILE");
              }}
            >
              @{loggedInUser.username}
            </a>
          </div>
          <button id="logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {/* Feed Component */}
      <div className="feed">
        {/* Filter */}
        <div className="filter">
          <h2>Home</h2>
        </div>

        {/* New Post Container */}
        <div className="new-post-container">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile"
          />
          <form onSubmit={handleSubmit}>
            <textarea
              maxLength="140"
              minLength="1"
              name="content"
              placeholder="What's happening?"
            ></textarea>

            {/* Post Tools */}
            <div className="post-tools">
              <input type="submit" value="Tweet" />
            </div>
          </form>
        </div>

        {/* For You Section */}
        <center>
          <p style={{ height: "30px", borderBottom: "1px solid #eee" }}>
            For You
          </p>
        </center>

        {/* Post Container */}
        {filteredPosts.map((post, index) => (
          <div className="post-container" key={index}>
            <div className="text-container">
              <a
                href="#"
                onClick={() => {
                  setSelectedUser(post.username);
                  setView("PROFILE");
                }}
              >
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
