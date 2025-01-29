import React from "react";

function Recommendations({ songs, selectedSong, setSelectedSong }) {
  const handlePlayButtonPress = (song) => {
    if (song.link) {
      window.open(song.link, "_blank");
    }
  };

  return (
    <div className="Recommendations">
      <h2>Recommendations for you.</h2>
      <div className="RecommendedSongList">
        {songs.map((song, index) => (
          <div
            key={index}
            className={`SongCard ${
              selectedSong?.id === song.id ? "Selected" : ""
            }`}
            onClick={() =>
              setSelectedSong(selectedSong?.id === song.id ? null : song)
            }
          >
            <div className="SongDetails">
              <h3 className="SongName">{song.title}</h3>
              <p className="SongArtist">{song.artist}</p>
            </div>
            <div className="CoverSection">
              <p className="Duration">{song.duration}</p>
              <div className="CoverImage">
                <img src={song.albumCover} alt={`${song.title} cover`} />
                <span
                  className="PlayButton material-symbols-outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayButtonPress(song);
                  }}
                >
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
