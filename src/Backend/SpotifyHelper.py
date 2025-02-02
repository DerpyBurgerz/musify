import random
import os
from dotenv import load_dotenv
import urllib.parse
import requests
import base64
from math import floor
from fastapi import FastAPI

load_dotenv()

REACT_APP_REDIRECT_URI = os.getenv('REACT_APP_REDIRECT_URI')
REACT_APP_CLIENT_ID = os.getenv('REACT_APP_CLIENT_ID')
REACT_APP_CLIENT_SECRET = os.getenv('REACT_APP_CLIENT_SECRET')

def generateRandomString(length):
    text = ""
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for _ in range(length):
        randomInt = random.randint(0, length - 1)
        text += possible[randomInt]
    return text

def getOAuthCodeUrl():
    scope = "user-read-recently-played"
    url = "https://accounts.spotify.com/authorize"
    url += "?response_type=code"
    url += f"&client_id={urllib.parse.quote(REACT_APP_CLIENT_ID)}"
    url += f"&scope={scope}"
    url += f"&state={urllib.parse.quote(generateRandomString(16))}"
    url += f"&redirect_uri={urllib.parse.quote(REACT_APP_REDIRECT_URI)}"
    return url

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