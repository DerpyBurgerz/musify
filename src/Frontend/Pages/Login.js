import React from "react";
import SpotifyHelper from "../Helpers/SpotifyHelper";

import "../Styles/Login.css";

const Login = () => {
  const loginRedirect = () => {
    window.location = SpotifyHelper.getOAuthCodeUrl(
      process.env.REACT_APP_REDIRECT_URI
    );
  };

  return (
    <div className="Login">
      <h1>musify.</h1>
      <p>the place to discover new music with customisability.</p>
      <button className="spotify-button" onClick={loginRedirect}>
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
