import React, { useState, useEffect } from "react";
import "../../Styles/Dashboard/Dashboard.css";
import "../../Styles/Dashboard/Filters.css";
import "../../Styles/Dashboard/SelectedSong.css";
import "../../Styles/Dashboard/Recommendations.css";

import Filters from "./Filters";
import SelectedSong from "./SelectedSong";
import Recommendations from "./Recommendations";

import SpotifyHelper from "../../Helpers/SpotifyHelper";
import FilterHelper from "../../Helpers/FilterHelper";

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
    if (!accessToken || songList.length > 0) {
      return;
    }

    updateRecommendedSongs();
  }, [accessToken, songList.length, bpmRangeFilter, genreFilter]);

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

  const updateRecommendedSongs = async () => {
    const bpmLow = bpmRangeFilter[0];
    const bpmHigh = bpmRangeFilter[1];
    const genres = genreFilter;

    const recommendedTrackIds = await FilterHelper.getFilteredSongs(
      bpmLow,
      bpmHigh,
      genres
    );

    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      const songs = await SpotifyHelper.getTracksInfo(
        accessToken,
        recommendedTrackIds
      );

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
        updateRecommendedSongs={updateRecommendedSongs}
        setSongList={setSongList}
      />
      <Recommendations
        songs={songList}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
      />
      {selectedSong && (
        <SelectedSong
          selectedSong={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
