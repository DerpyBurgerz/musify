import React from "react";
import SpotifyHelper from "../Helpers/SpotifyHelper";

import "../Styles/Login.css";

const Login = () => {
  const loginRedirect = async () => {
    const oauthcode = await SpotifyHelper.getOAuthCodeUrl();
    window.location = oauthcode;
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
