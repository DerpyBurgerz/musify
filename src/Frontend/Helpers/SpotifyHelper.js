class SpotifyHelper {
  static generateRandomString(length) {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static getOAuthCodeUrl(redirectUri) {
    const scope =
      'user-read-recently-played';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=code';
    url += `&client_id=${encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}`;
    url += `&scope=${encodeURIComponent(scope)}`;
    url += `&state=${encodeURIComponent(this.generateRandomString(16))}`;
    url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return url;
  }

  static async getUserInfo(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me', {
      Accepts: 'application/json',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }
}
export default SpotifyHelper;