class SpotifyHelper {
  static generateRandomString(length) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static getOAuthCodeUrl(redirectUri) {
    const scope = "user-read-recently-played";

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=code";
    url += `&client_id=${encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}`;
    url += `&scope=${encodeURIComponent(scope)}`;
    url += `&state=${encodeURIComponent(this.generateRandomString(16))}`;
    url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return url;
  }

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

      if (!response.ok) {
        throw new Error(
          `Token request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error fetching Spotify token:", error);
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

  static getRecentlyPlayed = async (accessToken) => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=10",
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
        trackName: item.track.name,
        artistName: item.track.artists.map((artist) => artist.name).join(", "),
        albumImage: item.track.album.images[0]?.url || "",
        playedAt: item.played_at,
        duration: item.track.duration,
      }));
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);
      return [];
    }
  };
}
export default SpotifyHelper;
