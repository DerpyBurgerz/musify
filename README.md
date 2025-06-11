# musify

musify is a web app that helps users discover new music with more customizability and transparency than a regular recommender. musify is powered by Spotify's API.

## Features

- Login with Spotify
- Get song recommendations based on your 50 most listened to songs in the last 6 months.
- Filter the given recommendation by genre, BPM, release year, and more.
- Export the recommended songs directly to your Spotify in a playlist.

## Tech Stack

- **Frontend:** React (JS),
- **Backend:** FastAPI (Python), SQLite
- **Spotify API**

## Building the Project

### Prerequisites

- Node.js and npm
- Python
- Spotify Developer Account

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/DerpyBurgerz/musify.git
   cd musify
   ```

2. **Install dependencies:**

   - Frontend:

   ```sh
   npm install
   ```

   - Backend:

   ```sh
     pip install fastapi uvicorn python-dotenv httpx pandas
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```
   REACT_APP_CLIENT_ID=your_spotify_client_id
   REACT_APP_CLIENT_SECRET=your_spotify_client_secret
   REACT_APP_REDIRECT_URI=http://localhost:3000/redirect
   REACT_APP_CLIENT_SCOPE=user-top-read playlist-modify-private playlist-modify-public
   ```

4. **Set up the database:**

   ```sh
   python src/Backend/database/setup.py
   ```

5. **Run the backend:**

   ```sh
   fastapi dev src/Backend/main.py
   ```

6. **Run the frontend:**

   ```sh
   npm start
   ```

7. **Open http://localhost:3000 in you browser.**
