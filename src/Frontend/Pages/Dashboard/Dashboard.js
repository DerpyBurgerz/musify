import React, { useState } from "react";
import "../../Styles/Dashboard/Dashboard.css";
import "../../Styles/Dashboard/Filters.css";
import "../../Styles/Dashboard/SelectedSong.css";
import "../../Styles/Dashboard/Recommendations.css";

import Filters from "./Filters";
import SelectedSong from "./SelectedSong";
import Recommendations from "./Recommendations";

import cover1 from "../../Images/song1.jpg";
import cover2 from "../../Images/song2.jpg";
import cover3 from "../../Images/song3.jpg";
import cover4 from "../../Images/song4.jpg";
import cover5 from "../../Images/song5.jpg";
import cover6 from "../../Images/song6.jpg";

function Dashboard() {
  const [selectedSong, setSelectedSong] = useState(null);

  // Filters
  const [genreFilter, setGenreFilter] = useState("");
  const [bpmRangeFilter, setBpmRangeFilter] = useState([0, 999999]);
  const [bpmRangeInput, setBpmRangeInput] = useState([0, 220]);
  const [familiarityFilter, setFamiliarityFilter] = useState(0.5);
  const [isRerecommendAllowed, setIsRerecommendAllowed] = useState(true);

  const recommendedSongs = [
    {
      songName: "Song 1",
      songArtist: "Artist A, Artist B",
      duration: "01:23",
      coverImage: cover1,
      genre: "EDM",
      bpm: 128,
      familiarityWithArtist: 0.95,
      recommendedBefore: true,
    },
    {
      songName: "Song 2",
      songArtist: "Artist C",
      duration: "03:45",
      coverImage: cover2,
      genre: "Pop",
      bpm: 100,
      familiarityWithArtist: 0.62,
      recommendedBefore: false,
    },
    {
      songName: "Song 3",
      songArtist: "Artist D & Artist E",
      duration: "02:50",
      coverImage: cover3,
      genre: "EDM",
      bpm: 150,
      familiarityWithArtist: 0.2,
      recommendedBefore: false,
    },
    {
      songName: "Song 4",
      songArtist: "Artist F",
      duration: "04:15",
      coverImage: cover4,
      genre: "Rap",
      bpm: 120,
      familiarityWithArtist: 0.8,
      recommendedBefore: true,
    },
    {
      songName: "Song 5",
      songArtist: "Artist G",
      duration: "03:30",
      coverImage: cover5,
      genre: "Pop",
      bpm: 130,
      familiarityWithArtist: 0,
      recommendedBefore: false,
    },
    {
      songName: "A very long song name",
      songArtist: "A very long artist name",
      duration: "02:40",
      coverImage: cover6,
      genre: "Rap",
      bpm: 400,
      familiarityWithArtist: 0.9,
      recommendedBefore: false,
    },
  ];

  const filteredSongs = recommendedSongs
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
