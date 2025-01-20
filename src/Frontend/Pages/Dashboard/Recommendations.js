import React from "react";

function Recommendations({ songs, selectedSong, setSelectedSong }) {
  return (
    <div className="Recommendations">
      <h2>Recommendations for you.</h2>
      <div className="RecommendedSongList">
        {songs.map((song, index) => (
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
  );
}

export default Recommendations;
