import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="left-sidebar"></div>
      <div className="feed">
        <div className="filter">
          <h2>Home</h2>
        </div>
        <div className="new-post-container">
          <img src="#" />
          <form action="" method="post">
            <textarea
              maxLength="140"
              minLength="1"
              placeholder="What's happening?"
            ></textarea>

            <div className="post-tools">
              <input type="submit" value="Tweet" />
            </div>
          </form>
        </div>
        <center>
          <p style={{ height: "30px", borderBottom: "1px solid #eee" }}>
            For You
          </p>
        </center>
        <div className="post-container">
          <div className="text-container">
            <a href="">Omar</a>
            <p>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>
          <img src="" />
        </div>
        {/* Add additional post containers here */}
      </div>
    </div>
  );
};

export default Dashboard;
