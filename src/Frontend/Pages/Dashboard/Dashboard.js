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

  const recommendedSongs = [
    {
      songName: "Song 1",
      songArtist: "Artist A, Artist B",
      duration: "01:23",
      coverImage: cover1,
      genre: "EDM",
      bpm: 128,
    },
    {
      songName: "Song 2",
      songArtist: "Artist C",
      duration: "03:45",
      coverImage: cover2,
      genre: "Pop",
      bpm: 100,
    },
    {
      songName: "Song 3",
      songArtist: "Artist D & Artist E",
      duration: "02:50",
      coverImage: cover3,
      genre: "EDM",
      bpm: 150,
    },
    {
      songName: "Song 4",
      songArtist: "Artist F",
      duration: "04:15",
      coverImage: cover4,
      genre: "Rap",
      bpm: 120,
    },
    {
      songName: "Song 5",
      songArtist: "Artist G",
      duration: "03:30",
      coverImage: cover5,
      genre: "Pop",
      bpm: 130,
    },
    {
      songName: "A very long song name",
      songArtist: "A very long artist name",
      duration: "02:40",
      coverImage: cover6,
      genre: "Rap",
      bpm: 999,
    },
  ];

  const filteredSongs = recommendedSongs.filter(
    (song) =>
      (genreFilter === "" || song.genre === genreFilter) &&
      song.bpm >= bpmRangeFilter[0] &&
      song.bpm <= bpmRangeFilter[1]
  );

  return (
    <div className="Dashboard">
      <Filters
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        bpmRangeInput={bpmRangeInput}
        setBpmRangeInput={setBpmRangeInput}
        setBpmRangeFilter={setBpmRangeFilter}
        setSelectedSong={setSelectedSong}
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
