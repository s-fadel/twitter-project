import React from "react";
import "./dashboard.css";

// Dashboard-komponent
const Dashboard = () => {
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
          <form action="" method="post">
            <textarea
              maxLength="140"
              minLength="1"
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
        <div className="post-container">
          <div className="text-container">
            <a href="">Omar</a>
            <p>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>
          <img src="" />
        </div>
        {/* Lägg till ytterligare inläggskontainrar här */}
      </div>
    </div>
  );
};

export default Dashboard;
