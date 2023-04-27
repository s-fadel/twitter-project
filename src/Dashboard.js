import React, { useState, useEffect } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  // Get data from local storage on component mount
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) {
      setPosts(storedPosts);
    }
  }, []);

  // Update local storage when posts state changes
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Handle form submission to add new post
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      username: "Omar",
      content: formData.get("content"),
      image: "",
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="dashboard">
      {/* Vänster sidofält */}
      <div className="left-sidebar"></div>

      {/* Flödeskomponent */}
      <div className="feed">
        {/* Filter */}
        <div className="filter">
          <h2>Home</h2>
        </div>

        {/* Nytt inläggskontainer */}
        <div className="new-post-container">
          <img src="#" />
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
              <p>{post.content}</p>
            </div>
            {post.image && <img src={post.image} alt="image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
