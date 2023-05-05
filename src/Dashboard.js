import React, { useState, useEffect } from "react";

import "./dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

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
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      username: "Omar",
      content: formData.get("content"),
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
      {/* Vänster sidofält */}
      <div className="left-sidebar">
        <div className="menu-container">
          <div className="profil-holder">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>{" "}
            <a href="d">Omar</a>
          </div>

          <button id="logout">Logga ut</button>
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
              <a href="#">{post.username}</a>
              <p
                dangerouslySetInnerHTML={{
                  __html: renderHashtags(post.content),
                }}
              ></p>
            </div>
            {post.image && <img src={post.image} alt="image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
