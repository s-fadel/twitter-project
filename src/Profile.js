import { useState } from "react";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faCalendarAlt, faMapMarkerAlt, faUserPlus, faUsers, faLink } from "@fortawesome/free-solid-svg-icons";


const user = {
    name: "Steve Harvey",
    username: "IAmSteveHarvey",
    bio:
        "The Official Twitter of Steve Harvey.",
    profileImageUrl:
        "https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?fit=crop&w=400&h=400&q=80",
    professionalCategories: [
        "TV Host",
        "Radio Host",
        "Author",
        "Comedian",
        "Actor",
        "Entrepreneur",
    ],
    dateJoined: "March 2009",
    hometown: "Cleveland, Ohio",
    followers: 5.3e6,
    followingCount: 981,
    following: false,
    tweets: [
        {
            id: 1,
            text: "Looking forward to hosting Family Feud tonight!",
            date: "April 20, 2022",
        },
        {
            id: 2,
            text: "Just released my latest book 'Jump'!",
            date: "April 21, 2022",
        },
        {
            id: 3,
            text: "Excited to be back on my radio show tomorrow morning!",
            date: "April 22, 2022",
        },
    ],
};

function ProfilePage() {
    const [activeTab, setActiveTab] = useState("tweets");
    const [following, setFollowing] = useState(user.following);
    const [followersCount, setFollowersCount] = useState(user.followers);

    const {
        name,
        username,
        bio,
        profileImageUrl,
        professionalCategories,
        dateJoined,
        hometown,
        followers,
        followingCount,
        tweets,
    } = user;

    let activeContent;
    switch (activeTab) {
        case "tweets":
            activeContent = (
                <div className="tweet-container">
                    {user.tweets.slice().reverse().map((tweet) => (
                        <div key={tweet.id} className="tweet">
                            <div className="tweet-header">
                                <span className="tweet-username">@{user.username}</span>
                                <span className="tweet-date">{tweet.date}</span>
                            </div>
                            <div className="tweet-text">{tweet.text}</div>
                        </div>
                    ))}
                </div>
            );
            break;
        default:
            activeContent = (
                <div className="tweets">
                    <p>No content to display.</p>
                </div>
            );
    }
    return (
        <div className="profile-page">
            <div className="top-bar">
                <div className="top-bar-info">
                    <i className="back-arrow">←</i>
                    <h2 className="top-bar-name">{user.name}</h2>
                </div>
                <span className="tweet-count">{user.tweets.length} Tweets</span>
            </div>
            <header className="banner">
                <img
                    className="banner-image"
                    src="https://via.placeholder.com/1500x500"
                    alt="Banner"
                />
            </header>
            <div className="profile-image">
                <img src={user.profileImageUrl} alt={user.name} />
            </div>
            <div className="profile-details">
                <div className="profile-header">
                    <div className="name-and-username">
                        <h1>{user.name}</h1>
                        <h2 style={{ fontSize: '18px' }}>@{user.username}</h2>
                    </div>
                    <div className="profile-stats">
                        <button
                            className="follow-button"
                            onClick={() => {
                                setFollowing(!following);
                                setFollowersCount(following ? followersCount - 1 : followersCount + 1);
                            }}
                        >
                            {following ? "Following" : "Follow"}
                        </button>
                    </div>
                </div>
                <div className="profile-info">
                    <p>
                        {user.bio}{" "}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faUserTie} />{" "}
                        {user.professionalCategories.join(", ")}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Joined: {user.dateJoined}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />  {user.hometown}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faLink} />{" "}
                        <a href="https://www.example.com">https://www.example.com</a></p>
                    <div className="followers-info">
                        <p>
                            <FontAwesomeIcon icon={faUserPlus} /> <mark>{user.followingCount}</mark> Following
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faUsers} /> <mark>{followersCount}</mark> Followers
                        </p>
                    </div>
                </div>
            </div >
            <nav>
                <h3 style={{ textDecorationLine: 'underline', textDecorationColor: 'black' }}>Tweets</h3>
            </nav>
            <main>{activeContent}</main>
        </div>
    );
}
export default ProfilePage;