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


@app.get("/filteredSongs/")
def get_filtered_music(bpmlow: int, bpmhigh: int):
    columns = ["tempo", "energy", "playlist_genre"]
    csvFile = pandas.read_csv('src\Backend\high_popularity_spotify_data.csv', usecols=columns)
    filter = filters(["pop"], (bpmlow, bpmhigh))
    data = filter.getFilteredData(csvFile)
    return {"filteredSongs": data.values.tolist()}

@app.get("/randomTrackInfo/")
async def get_random_track_image(trackid: str, token: str):
    return await SpotifyHelper.getTrackImage(trackid, token)

