import React, { useState, useEffect } from "react";
import "../../Styles/Dashboard/Dashboard.css";
import "../../Styles/Dashboard/Filters.css";
import "../../Styles/Dashboard/SelectedSong.css";
import "../../Styles/Dashboard/Recommendations.css";

import Filters from "./Filters";
import SelectedSong from "./SelectedSong";
import Recommendations from "./Recommendations";

import SpotifyHelper from "../../Helpers/SpotifyHelper";

function Dashboard() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songList, setSongList] = useState([]);

  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("access_token")
  );

  // Filters
  const [genreFilter, setGenreFilter] = useState("");
  const [bpmRangeFilter, setBpmRangeFilter] = useState([0, 999999]);
  const [bpmRangeInput, setBpmRangeInput] = useState([0, 220]);
  const [familiarityFilter, setFamiliarityFilter] = useState(0.5);
  const [isRerecommendAllowed, setIsRerecommendAllowed] = useState(true);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      const accessToken = sessionStorage.getItem("access_token");

      if (accessToken) {
        const songs = await SpotifyHelper.getRecentlyPlayed(accessToken, 50);

        const formattedSongs = songs.map((song) => ({
          id: song.id,
          title: song.trackName,
          artist: song.artistName,
          bpm: Math.floor(Math.random() * (250 - 60 + 1)) + 60,
          genre: ["Pop", "Rap", "EDM"][Math.floor(Math.random() * 3)],
          familiarityWithArtist: Math.random(),
          recommendedBefore: false,
          albumCover: song.albumImage,
          duration: song.duration,
          link: song.link,
          popularity: song.popularity,
        }));
        setSongList(formattedSongs);
      }
    };

    if (!accessToken || songList.length > 0) {
      return;
    }

    fetchRecentlyPlayed();
  }, [accessToken, songList.length]);

  useEffect(() => {
    const checkToken = () => {
      const newToken = sessionStorage.getItem("access_token");
      if (newToken && newToken !== accessToken) {
        setAccessToken(newToken);
      }
    };

    checkToken();
    const interval = setInterval(() => {
      if (!accessToken) {
        checkToken();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [accessToken]);

  const filteredSongs = songList
    .filter(
      (song) =>
        (genreFilter === "" || song.genre === genreFilter) &&
        song.bpm >= bpmRangeFilter[0] &&
        song.bpm <= bpmRangeFilter[1] &&
        (isRerecommendAllowed || !song.recommendedBefore)
    )
    .sort((a, b) => {
      const familiarityDifferenceA = Math.abs(
        a.familiarityWithArtist - familiarityFilter
      );
      const familiarityDifferenceB = Math.abs(
        b.familiarityWithArtist - familiarityFilter
      );

      return familiarityDifferenceB - familiarityDifferenceA;
    });

  return (
    <div className="Dashboard">
      <Filters
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        bpmRangeInput={bpmRangeInput}
        setBpmRangeInput={setBpmRangeInput}
        setBpmRangeFilter={setBpmRangeFilter}
        setSelectedSong={setSelectedSong}
        familiarityFilter={familiarityFilter}
        setFamiliarityFilter={setFamiliarityFilter}
        isRerecommendAllowed={isRerecommendAllowed}
        setIsRerecommendAllowed={setIsRerecommendAllowed}
      />
      <SelectedSong selectedSong={selectedSong} />
      <Recommendations
        songs={filteredSongs}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
      />
    </div>
  );
}

export default Dashboard;
