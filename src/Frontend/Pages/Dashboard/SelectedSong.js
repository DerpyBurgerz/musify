import React from "react";

function SelectedSong({ selectedSong, onClose }) {
  if (!selectedSong) return null;

  return (
    <div className="SelectedSongOverlay" onClick={onClose}>
      <div className="SelectedSongModal" onClick={(e) => e.stopPropagation()}>
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
                <span className="label">Genre:</span>{" "}
                {selectedSong.genre[0].toUpperCase() +
                  selectedSong.genre.slice(1)}
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
        <button className="CloseButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SelectedSong;
