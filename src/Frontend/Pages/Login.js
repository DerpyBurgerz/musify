import React from "react";
import SpotifyHelper from "../Helpers/SpotifyHelper";
import "../Styles/App.css";

const Login = () => {
  const loginRedirect = () => {
    window.location = SpotifyHelper.getOAuthCodeUrl(
      process.env.REACT_APP_REDIRECT_URI
    );
  };

  return (
    <div className="Login">
      <h1>musify.</h1>
      <button className="spotify-button" onClick={loginRedirect}>
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
