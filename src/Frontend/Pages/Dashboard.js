import React, { useState } from "react";
import Slider from "rc-slider";
import Checkbox from "rc-checkbox";
import "rc-slider/assets/index.css";
import "../Styles/Dashboard.css";

import cover1 from "../Images/song1.jpg";
import cover2 from "../Images/song2.jpg";
import cover3 from "../Images/song3.jpg";
import cover4 from "../Images/song4.jpg";
import cover5 from "../Images/song5.jpg";
import cover6 from "../Images/song6.jpg";

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

  const handleBpmChange = (value) => {
    setBpmRangeInput(value);
    if (value[1] === 220) {
      setBpmRangeFilter([value[0], 9999999]);
    } else {
      setBpmRangeFilter(value);
    }
    console.log(value, bpmRangeFilter);
  };

  return (
    <div className="Dashboard">
      <div className="Filters">
        <h2>Filters</h2>
        <div className="GenreFilter">
          <h3>Genre:</h3>
          <select
            name="Genre"
            value={genreFilter}
            onChange={(e) => {
              setGenreFilter(e.target.value);
              setSelectedSong(null);
            }}
          >
            <option value="">All</option>
            <option value="Pop">Pop</option>
            <option value="Rap">Rap</option>
            <option value="EDM">EDM</option>
          </select>
        </div>
        <div className="BpmFilter">
          <h3>BPM Range:</h3>
          <div className="BpmSlider">
            <div className="BpmDisplay">{bpmRangeInput[0]}</div>
            <Slider
              range
              min={0}
              max={220}
              step={1}
              value={bpmRangeInput}
              onChange={(value) => {
                handleBpmChange(value);
                setSelectedSong(null);
              }}
            />
            <div className="BpmDisplay">
              {bpmRangeInput[1] === 220 ? "220+" : bpmRangeInput[1]}
            </div>
          </div>
        </div>
        <div className="ArtistFamiliarityFilter">
          <h3>Artist familiarity:</h3>
          <div className="ArtistFamiliaritySlider">
            <p>Only artists I know</p>
            <Slider min={0} max={100} className="AFSlider"></Slider>
            <p>Only new artists</p>
          </div>
        </div>
        <div className="AllowRerecommendedFilter">
          <h3>Allow rerecommended songs:</h3>
          <div className="AllowRerecommendedCheckbox">
            <Checkbox />
          </div>
        </div>
      </div>
      <div className="SelectedSong">
        <h2>Selected Song:</h2>
        {selectedSong ? (
          <div className="SelectedSongContainer">
            <div className="SelectedSongDetails">
              <p>{selectedSong.songName}</p>
              <p>Artist: {selectedSong.songArtist}</p>
              <p>{selectedSong.duration}</p>
              <p>Genre: {selectedSong.genre}</p>
              <p>BPM: {selectedSong.bpm}</p>
            </div>
            <div className="SelectedSongCover">
              <img
                src={selectedSong.coverImage}
                alt={`${selectedSong.songName} cover`}
                className="SelectedCoverImage"
              />
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="Recommendations">
        <h2>Recommendations for you.</h2>
        <div className="RecommendedSongList">
          {filteredSongs.map((song, index) => (
            <div
              key={index}
              className={`SongCard ${
                selectedSong?.songName === song.songName ? "Selected" : ""
              }`}
              onClick={() =>
                setSelectedSong(
                  selectedSong?.songName === song.songName ? null : song
                )
              }
            >
              <div className="SongDetails">
                <h3 className="SongName">{song.songName}</h3>
                <p className="SongArtist">{song.songArtist}</p>
              </div>
              <div className="CoverSection">
                <p className="Duration">{song.duration}</p>
                <div className="CoverImage">
                  <img src={song.coverImage} alt={`${song.songName} cover`} />
                  <span class="PlayButton material-symbols-outlined">
                    play_arrow
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
