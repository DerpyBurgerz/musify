import React from "react";

function SelectedSong({ selectedSong }) {
  return (
    <div className="SelectedSong">
      <h2>Selected Song:</h2>
      {selectedSong ? (
        <div className="SelectedSongContainer">
          <div className="SelectedSongDetails">
            <p>
              <span className="label">Name:</span> {selectedSong.title}
            </p>
            <p>
              <span className="label">Artist:</span> {selectedSong.artist}
            </p>
            <p>
              <span className="label">Duration:</span> {selectedSong.duration}
            </p>
            <p>
              <span className="label">Genre:</span> {selectedSong.genre}
            </p>
            <p>
              <span className="label">BPM:</span> {selectedSong.bpm}
            </p>
            <p>
              <span className="label">
                Your familiarity with {selectedSong.artist}:
              </span>{" "}
              {Math.round(selectedSong.familiarityWithArtist * 100)}%
            </p>
            <p>
              <span className="label">Popularity:</span>{" "}
              {selectedSong.popularity}%
            </p>
          </div>
          <div className="SelectedSongCover">
            <img
              src={selectedSong.albumCover}
              alt={`${selectedSong.title} cover`}
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
