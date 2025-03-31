import React from "react";

function Recommendations({ songs, selectedSong, setSelectedSong, isLoading }) {
  const handlePlayButtonPress = (song) => {
    if (song.link) {
      window.open(song.link, "_blank");
    }
  };

  document.querySelectorAll(".Skeleton").forEach((skeleton, index) => {
    const songDetails = skeleton.firstChild;
    const coverSection = skeleton.lastChild;

    songDetails.childNodes.forEach((child) => {
      child.style.animationDelay = `${index * 0.1}s`;
    });
    coverSection.lastChild.style.animationDelay = `${index * 0.1}s`;
  });

  return (
    <div className="Recommendations">
      <h2>Recommendations for you.</h2>
      <div className="recommended-songlist-container">
        <div className="RecommendedSongList">
          {isLoading
            ? Array.from({ length: 50 }, (_, index) => (
                <div key={index} className="SongCard Skeleton">
                  <div className="SongDetails">
                    <div className="SongName SkeletonText"></div>
                    <div className="SongArtist SkeletonText"></div>
                  </div>
                  <div className="CoverSection">
                    <div className="SkeletonText SongDuration"></div>
                    <div className="CoverImage SkeletonImage"></div>
                  </div>
                </div>
              ))
            : songs.map((song, index) => (
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
      <div className="button-wrapper">
        <button className="create-playlist-button">Create Playlist</button>
      </div>
    </div>
  );
}

export default Recommendations;
