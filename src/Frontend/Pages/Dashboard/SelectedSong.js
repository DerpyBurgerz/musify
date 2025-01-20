import React from "react";

function SelectedSong({ selectedSong }) {
  return (
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
  );
}

export default SelectedSong;
