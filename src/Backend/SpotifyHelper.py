import random
import os
from dotenv import load_dotenv
import urllib.parse
import requests
import httpx
import asyncio
import base64
from math import floor
from fastapi import FastAPI

load_dotenv()

REACT_APP_REDIRECT_URI = os.getenv("REACT_APP_REDIRECT_URI")
REACT_APP_CLIENT_ID = os.getenv("REACT_APP_CLIENT_ID")
REACT_APP_CLIENT_SECRET = os.getenv("REACT_APP_CLIENT_SECRET")
REACT_APP_CLIENT_SCOPE = os.getenv("REACT_APP_CLIENT_SCOPE")


def generateRandomString(length):
    text = ""
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for _ in range(length):
        randomInt = random.randint(0, length - 1)
        text += possible[randomInt]
    return text


def getOAuthCodeUrl():
    url = "https://accounts.spotify.com/authorize"
    url += "?response_type=code"
    url += f"&client_id={urllib.parse.quote(REACT_APP_CLIENT_ID)}"
    url += f"&scope={REACT_APP_CLIENT_SCOPE}"
    url += f"&state={urllib.parse.quote(generateRandomString(16))}"
    url += f"&redirect_uri={urllib.parse.quote(REACT_APP_REDIRECT_URI)}"
    return url


async def getTrackImage(trackid: str, token: str):
    try:
        headers = {"Authorization": f"Bearer {token}"}
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.spotify.com/v1/tracks/{trackid}", headers=headers
            )
        data = response.json()
        image = data["album"]["images"][0]["url"]

        return image
    except Exception as e:
        print(f"Error: {e}")
        return None


async def getTopTracks(accessToken, limit):
    try:
        headers = {"Authorization": f"Bearer {accessToken}"}
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.spotify.com/v1/me/top/tracks?limit={limit}",
                headers=headers,
            )
        data = response.json()
        return data
    except Exception as e:
        print(f"Error: {e}")
        return None


async def getArtist(access_token: str, artist_id: str) -> dict:
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.spotify.com/v1/artists/{artist_id}", headers=headers
            )
            data = response.json()
            return data
    except Exception as e:
        print(f"Error: {e}")
        return None


# @app.get("/spotify/token")
# async def getSpotifyToken(code):
#     try:
#         body = {
#           "grant_type": "authorization_code",
#           "code": code,
#           "redirect_uri": REACT_APP_REDIRECT_URI,
#         }
#         headers = {
#           "Content-Type": "application/x-www-form-urlencoded",
#           "Authorization": f"Basic {base64.b64encode(REACT_APP_CLIENT_ID + ":" + REACT_APP_CLIENT_SECRET)}"
#         }
#         response = requests.post("https://accounts.spotify.com/api/token", headers=headers, data=body)
#         data = await response.json()
#         return data["access_token"]

#     except Exception as e:
#         print(f"Error: {e}")
#         return None


# async def getRecentlyPlayed(accessToken, limit):
#     try:
#         respons = await
#     except Exception as e:
#         print(f"Error: {e}")
#         return None


# def convertDuration(ms: int) -> str:
#     seconds = floor(ms/1000)
#     minutes = floor(seconds/60)
#     remainingSeconds = seconds % 60
#     return f"{minutes:02}:{remainingSeconds:02}"
