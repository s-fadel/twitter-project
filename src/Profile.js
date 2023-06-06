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
import SearchBar from "./SearchBar";


function ProfilePage({ setView, selectedUser, setSelectedUser }) {
    const [activeTab, setActiveTab] = useState("tweets");
    const [following, setFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [userTweets, setUserTweets] = useState([]);
    const [tweetCount, setTweetCount] = useState(0);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [userData, setUserData] = useState({});
    const [followingCount, setFollowingCount] = useState(0);
    const [userFollowingCount, setUserFollowingCount] = useState(0);

    const goBack = () => {
        setView("DASHBOARD");
    };

    useEffect(() => {
        const usersList = JSON.parse(localStorage.getItem(localStorageKey));
        const user = usersList.find((user) => user.username === selectedUser);
        setUserData(user);
        setUserFollowingCount(user.following.length);
        setFollowersCount(user.followers.length);

        const loggedInUser = usersList.find((user) => user.isLoggedIn === true);
        const alreadyFollowing = loggedInUser.following.includes(user.username);
        setFollowing(alreadyFollowing);
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

        const userList = JSON.parse(localStorage.getItem(localStorageKey));
        const loggedInUser = userList.find(user => user.isLoggedIn === true);
        setIsOwnProfile(loggedInUser && loggedInUser.username === userData.username);
    }, [userData.username]);

    useEffect(() => {
        setTweetCount(userTweets.length);
    }, [userTweets]);

    useEffect(() => {
        const usersList = JSON.parse(localStorage.getItem(localStorageKey));
        const loggedInUser = usersList.find((user) => user.isLoggedIn);
        if (loggedInUser) {
            setFollowingCount(loggedInUser.following.length);
        }
    }, []);

    const handleFollow = () => {
        const usersList = JSON.parse(localStorage.getItem(localStorageKey));
        const loggedInUser = usersList.find(user => user.isLoggedIn);
        const alreadyFollowing = loggedInUser.following.includes(userData.username);

        if (!alreadyFollowing) {
            loggedInUser.following.push(userData.username);

            const userIndex = usersList.findIndex(user => user.username === userData.username);
            usersList[userIndex].followers.push(loggedInUser.username);

            setFollowing(true);
            setFollowersCount(followersCount + 1);
        } else {
            loggedInUser.following = loggedInUser.following.filter(username => username !== userData.username);

            const userIndex = usersList.findIndex(user => user.username === userData.username);
            usersList[userIndex].followers = usersList[userIndex].followers.filter(username => username !== loggedInUser.username);

            setFollowing(false);
            setFollowersCount(followersCount - 1);
        }

        const loggedInUserIndex = usersList.findIndex(user => user.isLoggedIn);
        usersList[loggedInUserIndex] = loggedInUser;
        localStorage.setItem(localStorageKey, JSON.stringify(usersList));

        setFollowingCount(loggedInUser.following.length);
    };



    const {
        username,
        bio,
        profileImageUrl,
        professionalCategories,
        dateJoined,
        hometown,
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
                            <FontAwesomeIcon icon={faUserPlus} /><mark>{isOwnProfile ? followingCount : userFollowingCount}</mark> Following
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
            <div className="profile-page">
                <SearchBar setSelectedUser={setSelectedUser} setView={setView} />
                {/* ... Rest of your ProfilePage code */}
            </div>
        </div>

    );
}
export default ProfilePage;