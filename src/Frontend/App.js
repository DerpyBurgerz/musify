import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Redirect from "./Pages/Redirect";
import Header from "./Pages/Header";
import SpotifyHelper from "./Helpers/SpotifyHelper";
import toast, { Toaster } from "react-hot-toast";

import "./Styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchSpotifyData = async () => {
      const code = sessionStorage.getItem("code");

      if (code) {
        setIsLoggedIn(true);

        const accessToken = await SpotifyHelper.getSpotifyToken(code);
        if (accessToken) {
          sessionStorage.setItem("access_token", accessToken);
          const userData = await SpotifyHelper.getSpotifyProfile(accessToken);
          const profilePic = userData.profileImage;
          const id = userData.id;

          sessionStorage.setItem("id", id);
          setProfilePicture(profilePic);
        }
      }
    };

    fetchSpotifyData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("code");
    setIsLoggedIn(false);
    setProfilePicture("");
  };

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        profilePicture={profilePicture}
        onLogout={handleLogout}
      />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
