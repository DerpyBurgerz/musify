from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import SpotifyHelper
from recommender import filters, get_song_properties, get_recommendations_based_on_songs
from database.database import get_user, create_user
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
async def get_filtered_music(
    id: str, bpmlow: int, bpmhigh: int, accessToken: str, genres: str = ""
):
    genres = genres.split(",")
    columns = [
        "tempo",
        "energy",
        "genre",
        "track_id",
        "danceability",
        "liveness",
        "valence",
        "speechiness",
        "track_name",
        "artist_name",
    ]
    csvFile = pandas.read_csv("src\\Backend\\spotify_data.csv", usecols=columns)
    filter = filters(genres, (bpmlow, bpmhigh))
    data = filter.getFilteredData(csvFile)

    user_genres = set()

    user_data = get_user(id)
    if user_data == None:
        top_tracks = await SpotifyHelper.getTopTracks(accessToken, 20)
        items = top_tracks["items"]
        track_ids = [item["id"] for item in items]

        for track in items:
            artist_id = track["artists"][0]["id"]
            artist_info = await SpotifyHelper.getArtist(accessToken, artist_id)
            if "genres" in artist_info:
                for genre in artist_info["genres"]:
                    user_genres.add(genre)

        total_tracks_found = 0
        average_value = [0, 0, 0, 0, 0, 0]

        for track_id in track_ids:
            song_properties = get_song_properties(data, track_id)
            if song_properties.empty:
                continue

            total_tracks_found += 1
            energy = song_properties.iloc[0]["energy"]
            danceability = song_properties.iloc[0]["danceability"]
            liveness = song_properties.iloc[0]["liveness"]
            valence = song_properties.iloc[0]["valence"]
            speechiness = song_properties.iloc[0]["speechiness"]
            tempo = song_properties.iloc[0]["tempo"]

            average_value[0] += energy
            average_value[1] += danceability
            average_value[2] += liveness
            average_value[3] += valence
            average_value[4] += speechiness
            average_value[5] += tempo
        average_value[5] = average_value[5] / 250
        if total_tracks_found > 0:
            user_data = [x / total_tracks_found for x in average_value]
        else:
            user_data = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, ""]

        create_user(
            id,
            user_data[0],
            user_data[1],
            user_data[2],
            user_data[3],
            user_data[4],
            user_data[5],
            list(user_genres),
        )
    else:
        user_data = dict(user_data)
        user_genres = set(user_data["genres"])
        user_data = [
            user_data["energy"],
            user_data["danceability"],
            user_data["liveness"],
            user_data["valence"],
            user_data["speechiness"],
            user_data["tempo"],
        ]

    data = get_recommendations_based_on_songs([user_data], data, 50, user_genres)

    return {
        "filteredSongs": data[["track_id", "genre", "tempo"]].to_dict(orient="records")
    }


@app.get("/randomTrackInfo/")
async def get_random_track_image(trackid: str, token: str):
    return await SpotifyHelper.getTrackImage(trackid, token)


@app.get("/topTracks/")
async def get_top_tracks(accessToken: str, limit: int):
    return await SpotifyHelper.getTopTracks(accessToken, limit)
