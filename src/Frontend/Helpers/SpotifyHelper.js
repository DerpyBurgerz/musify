class SpotifyHelper {
  static getOAuthCodeUrl = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/spotify/code`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error while fetching", error);
      return null;
    }
  };

  static getSpotifyToken = async (code) => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            process.env.REACT_APP_CLIENT_ID +
              ":" +
              process.env.REACT_APP_CLIENT_SECRET
          )}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        }),
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      return null;
    }
  };

  static getSpotifyProfile = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Profile request failed: ${response.status} ${response.statusText}`
        );
      }

      const userData = await response.json();
      return {
        profileImage:
          userData.images && userData.images.length > 0
            ? userData.images[0].url
            : "",
        id: userData.id || "",
      };
    } catch (error) {
      console.error("Error fetching Spotify profile:", error);
      return "";
    }
  };

  static getTracksInfo = async (accessToken, recommendedTracks) => {
    try {
      const trackIds = recommendedTracks.map((track) => track.track_id);
      if (trackIds.length === 0) {
        return [];
      }

      const trackIdString = trackIds.join(",");
      const response = await fetch(
        `https://api.spotify.com/v1/tracks?ids=${trackIdString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Recommend songs request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.tracks.map((track, index) => ({
        id: track.id,
        trackName: track.name,
        artistName: track.artists.map((artist) => artist.name).join(", "),
        albumImage: track.album.images[0]?.url || "",
        duration: this.convertDuration(track.duration_ms),
        link: track.external_urls.spotify,
        popularity: track.popularity,
        bpm: Math.round(recommendedTracks[index]["tempo"]),
        genre: recommendedTracks[index]["genre"],
        releaseYear: track.album.release_date.split("-")[0],
      }));
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);
      return [];
    }
  };

  static convertDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }
}
export default SpotifyHelper;
