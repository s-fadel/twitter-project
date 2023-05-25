import { useState, useEffect } from "react";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserTie,
    faCalendarAlt,
    faMapMarkerAlt,
    faUserPlus,
    faUsers,
    faLink,
} from "@fortawesome/free-solid-svg-icons";
import { localStorageKey } from "./App";


function ProfilePage({ setView, selectedUser }) {
    const [activeTab, setActiveTab] = useState("tweets");
    const [following, setFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [userTweets, setUserTweets] = useState([]);
    const [tweetCount, setTweetCount] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [userData, setUserData] = useState({});

    const goBack = () => {
        setView("DASHBOARD");
    };
    useEffect(() => {
        const usersList = JSON.parse(localStorage.getItem(localStorageKey));
        const user = usersList.find((user) => user.username === selectedUser);
        console.log(user);
        setUserData(user);
    }, [selectedUser]);


    useEffect(() => {
        if (userData.username) {
            const storedPosts = JSON.parse(localStorage.getItem("posts"));
            if (storedPosts) {
                const userPosts = storedPosts.filter(
                    (post) => post.username === userData.username
                );
                setUserTweets(userPosts);
            }
        }
        // Fetch the user list from local storage.
        const userList = JSON.parse(localStorage.getItem(localStorageKey));
        // Find the user where isLoggedIn is true
        const loggedInUser = userList.find(user => user.isLoggedIn === true);
        setIsOwnProfile(loggedInUser && loggedInUser.username === userData.username);
    }, [userData.username]);

    useEffect(() => {
        setTweetCount(userTweets.length);
    }, [userTweets]);

    const handleFollow = () => {
        setFollowing(!following);
        setFollowersCount(following ? followersCount - 1 : followersCount + 1);
    };
    const loggedInUser = "loggedInUserUsername"; // Replace with the actual logged-in user's username


    const {
        username,
        bio,
        profileImageUrl,
        professionalCategories,
        dateJoined,
        hometown,
        followingCount,
        tweets,
    } = userData;

    let activeContent;
    switch (activeTab) {
        case "tweets":
            activeContent = (
                <div className="tweet-container">
                    {userTweets.slice().reverse().map((tweet, index) => (
                        <div key={index} className="tweet">
                            <div className="tweet-header">
                                <div className="tweet-username-container">
                                    <img
                                        className="tweet-pfp"
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                        alt={userData.username}
                                    />
                                    <span className="tweet-username">@{userData.username}</span>
                                </div>
                                <span className="tweet-date">{tweet.date}</span>
                            </div>
                            <div className="tweet-text">{tweet.content}</div>
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
                    <i onClick={() => goBack()} className="back-arrow">←</i>
                    <h2 className="top-bar-name">{userData.username}</h2>
                </div>
                <span className="tweet-count">{tweetCount} Tweets</span>
            </div>
            <header className="banner">
                <img
                    className="banner-image"
                    src="https://via.placeholder.com/1500x500?text=Banner+Image"
                    alt="Banner"
                />
            </header>
            <div className="profile-image">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt={userData.username} />
            </div>
            <div className="profile-details">
                <div className="profile-header">
                    <div className="name-and-username">
                        <h1>{userData.username}</h1>
                        <h2 style={{ fontSize: '18px' }}>@{userData.username}</h2>
                    </div>
                    <div className="profile-stats">
                        {!isOwnProfile && (
                            <button
                                className="follow-button"
                                onClick={handleFollow}
                            >
                                {following ? "Following" : "Follow"}
                            </button>
                        )}
                    </div>
                </div>
                <div className="profile-info">
                    <p>
                        {userData.about}{" "}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faUserTie} />{" "}
                        {userData.employment}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Joined: {userData.createdDate}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />  {userData.homeTown}
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faLink} />{" "}
                        <a href="https://www.example.com">https://www.example.com</a></p>
                    <div className="followers-info">
                        <p>
                            <FontAwesomeIcon icon={faUserPlus} /><mark>{userData.following}</mark> Following
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faUsers} /><mark>{followersCount}</mark> Followers
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