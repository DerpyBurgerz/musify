class SpotifyHelper {
  static getOAuthCodeUrl = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/spotify/code`);
      const data = await response.json();
      console.log(data.url);
      return data.url;
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
      return userData.images && userData.images.length > 0
        ? userData.images[0].url
        : "";
    } catch (error) {
      console.error("Error fetching Spotify profile:", error);
      return "";
    }
  };

  static getRecentlyPlayed = async (accessToken, limit) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Recently played request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.items.map((item) => ({
        id: item.track.id,
        trackName: item.track.name,
        artistName: item.track.artists.map((artist) => artist.name).join(", "),
        albumImage: item.track.album.images[0]?.url || "",
        duration: this.convertDuration(item.track.duration_ms),
        link: item.track.external_urls.spotify,
        popularity: item.track.popularity,
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
