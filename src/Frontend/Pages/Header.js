import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Header.css";

import GitHubLogo from "../Images/githublogo.png";

function Header({ isLoggedIn, profilePicture, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <h1 className={isLoggedIn ? "" : "disabled"}>
        {isLoggedIn ? <Link to="/">musify.</Link> : <span>musify.</span>}
      </h1>
      <nav>
        <ul>
          <li className="ProfileContainer">
            <a
              href="https://github.com/DerpyBurgerz/musify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GitHubLogo} alt="GitHub" className="GitHubLogo" />
            </a>
            {isLoggedIn ? (
              <>
                {!imageLoaded && <div className="ProfileSkeleton"></div>}{" "}
                {profilePicture && (
                  <img
                    src={profilePicture}
                    className={`ProfilePicture ${
                      imageLoaded ? "visible" : "hidden"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onClick={() => setShowDropdown((value) => !value)}
                    alt="Profile"
                  />
                )}
                {showDropdown && (
                  <div className="DropdownMenu">
                    <button onClick={onLogout}>Log out</button>
                  </div>
                )}
              </>
            ) : (
              location.pathname !== "/login" && <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
