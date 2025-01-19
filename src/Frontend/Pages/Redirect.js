import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const paramQuery = new URLSearchParams(location.search);

    const code = paramQuery.get("code");
    const error = paramQuery.get("error");

    if (code && !error) {
      sessionStorage.setItem("code", paramQuery.get("code"));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="Login">
      <h1>musify.</h1>
      <button className="spotify-button" disabled>
        Login with Spotify
      </button>
    </div>
  );
};

export default Redirect;
