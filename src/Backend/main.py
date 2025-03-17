from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import SpotifyHelper
from recommender import filters
import SpotifyHelper
import pandas

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# New endpoint for React frontend
@app.get("/message")
def get_message() -> str:
    return {"message": "test"}

@app.get("/spotify/code")
def get_oauth_code() -> str:
    return SpotifyHelper.getOAuthCodeUrl()

from recommender import get_recommendations_based_on_songs
@app.get("/filteredSongs/")
def get_filtered_music(bpmlow: int, bpmhigh: int, genres: list[str]):
    columns = ["tempo", "energy", "playlist_genre", 'track_name', 'danceability', 'liveness', 'valence', 'speechiness']
    csvFile = pandas.read_csv('src\Backend\high_popularity_spotify_data.csv', usecols=columns)
    filter = filters(genres, (bpmlow, bpmhigh))
    data = filter.getFilteredData(csvFile)

    data = get_recommendations_based_on_songs([[0.5, 0.5, 0.5, 0.5, 0.5, 130/200]], data, 10)

    return {"filteredSongs": data.values.tolist()}

@app.get("/randomTrackInfo/")
async def get_random_track_image(trackid: str, token: str):
    return await SpotifyHelper.getTrackImage(trackid, token)

