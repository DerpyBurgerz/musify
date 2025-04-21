import React from "react";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

function Recommendations({ songs, selectedSong, setSelectedSong, isLoading }) {
  const handlePlayButtonPress = (song) => {
    if (song.link) {
      window.open(song.link, "_blank");
    }
  };

  useEffect(() => {
    if (isLoading) {
      const skeletons = document.querySelectorAll(".Skeleton");
      skeletons.forEach((skeleton, index) => {
        const songDetails = skeleton.firstChild;
        const coverSection = skeleton.lastChild;

        songDetails.childNodes.forEach((child) => {
          child.style.animationDelay = `${index * 0.1}s`;
        });
        coverSection.lastChild.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [isLoading]);

  const handleCreatePlaylist = () => {
    // Create a new empty playlist
    const userId = sessionStorage.getItem("id");
    const accessToken = sessionStorage.getItem("access_token");

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const body = {
      name: `musify's recommendations (${currentDate})`,
      description: "50 songs recommended by musify.",
      public: false,
    };

    // Create the playlist
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        const playlistId = response.id;

        // Add all our tracks
        const trackURIs = songs.map((song) => `spotify:track:${song.id}`);
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ uris: trackURIs }),
        });
      })
      .then(toast.success("Succesfully created your playlist!"))
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong while creating your playlist.");
      });
  };

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
                        aria-label={`Play ${song.title} by ${song.artist}`}
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
        <button
          className="create-playlist-button"
          onClick={(e) => {
            handleCreatePlaylist(e);
          }}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default Recommendations;
