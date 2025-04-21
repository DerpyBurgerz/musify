import React from "react";
import SpotifyHelper from "../Helpers/SpotifyHelper";
import { toast } from "react-hot-toast";
import "../Styles/Login.css";

const Login = () => {
  const loginRedirect = async () => {
    toast.loading("Logging you in...");
    const oauthcode = await SpotifyHelper.getOAuthCodeUrl();
    if (oauthcode) {
      window.location = oauthcode;
    }
  };

  return (
    <div className="Login">
      <h1>musify.</h1>
      <p className="sub-title">
        the place to discover new music with customisability.
      </p>
      <button className="spotify-button" onClick={loginRedirect}>
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
