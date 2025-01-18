import React, { useState } from 'react';
import "../Styles/Dashboard.css"

import cover1 from '../Images/song1.jpg'
import cover2 from '../Images/song2.jpg'
import cover3 from '../Images/song3.jpg'
import cover4 from '../Images/song4.jpg'
import cover5 from '../Images/song5.jpg'
import cover6 from '../Images/song6.jpg'

const Dashboard = () => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [genreFilter, setGenreFilter] = useState("");

    const recommendedSongs = [
        {
            songName: "Circle",
            songArtist: "Netrum, Halvorsen",
            duration: "01:23",
            coverImage: cover1,
            genre: "EDM"
        },
        {
            songName: "Chicago",
            songArtist: "Bentham",
            duration: "03:45",
            coverImage: cover2,
            genre: "Pop"
        },
        {
            songName: "Fire",
            songArtist: "D-Block & S-te-fan",
            duration: "02:50",
            coverImage: cover3,
            genre: "EDM"
        },
        {
            songName: "Going Under",
            songArtist: "Sefa & Relianze",
            duration: "04:15",
            coverImage: cover4,
            genre: "Rap"
        },
        {
            songName: "Finorza",
            songArtist: "Camellia",
            duration: "03:30",
            coverImage: cover5,
            genre: "Pop"
        },
        {
            songName: "f*** this town",
            songArtist: "glaive, ericdoa",
            duration: "02:40",
            coverImage: cover6,
            genre: "Rap"
        }
    ];

    const filteredSongs = 
        genreFilter === ""
            ? recommendedSongs
            : recommendedSongs.filter((song) => song.genre === genreFilter);

    return (
        <div className="Dashboard">
            <div className="Filters">
                <h2>Filters</h2>
                <label>
                    Genre:
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
                </label>
            </div>
            <div className="SelectedSong">
            <h2>Selected Song:</h2>
                {selectedSong ? (
                    <div className="SelectedSongContainer">
                        <div className="SelectedSongDetails">
                            <p>{selectedSong.songName}</p>
                            <p>Artist: {selectedSong.songArtist}</p>
                            <p>{selectedSong.duration}</p>
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
                <h2>Your Recommendations:</h2>
                <div className="RecommendedSongList">
                    {filteredSongs.map((song, index) => (
                        <div
                        key={index}
                        className={`SongCard ${selectedSong?.songName === song.songName ? "Selected" : ""}`}
                        onClick={() => setSelectedSong(song)}
                        >
                            <div className="SongDetails">
                                <h3 className="SongName">{song.songName}</h3>
                                <p className="SongArtist">{song.songArtist}</p>
                            </div>
                            <div className="CoverSection">
                                <p className="Duration">{song.duration}</p>
                                <img
                                    src={song.coverImage}
                                    alt={`${song.songName} cover`}
                                    className="CoverImage"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
