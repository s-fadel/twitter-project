import React, { useState, useEffect } from "react";
import { localStorageKey } from "./App";
import "./SearchBar.css";

const SearchBar = ({ setSelectedUser, setView }) => {
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setUserSearchQuery(value);
    };

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
        <div className="right-sidebar">
            <form action="">
                <input
                    className="search-input"
                    placeholder="Search for someone"
                    type="text"
                    value={userSearchQuery}
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
    );
};

export default SearchBar;