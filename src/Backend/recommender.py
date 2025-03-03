import csv
from tabulate import tabulate

with open(r'high_popularity_spotify_data.csv', mode = 'r') as file:
    csvFile = csv.reader(file)
    print(type(csvFile))

import pandas
columns = ['tempo', 'energy']
csvFile = pandas.read_csv('high_popularity_spotify_data.csv', usecols=columns)
#print(csvFile)


def test():
    return (csvFile['tempo'] > 120) & (csvFile['energy'] > 0.7)

filtered = csvFile[test()]


#print(filtered.iloc[0:2])

from dataclasses import dataclass

# default values
@dataclass
class filters:
    genreFilter: list[str]
    bpmRange: tuple[int, int]

    def __post_init__(self):
        if self.genreFilter is None:
            self.genreFilter = []
        if self.bpmRange is None:
            self.bpmRange = [0, 999]
        
    def getFilteredData(self, data: pandas.DataFrame) -> pandas.DataFrame:
        return data[
            data['playlist_genre'].isin(self.genreFilter) &
            (data['tempo'] >= self.bpmRange[0]) &
            (data['tempo'] <= self.bpmRange[1])
            ]

import numpy as np
def cosine_similarity(a: [float], b: [float]) -> float:
    cos_similarity = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    return cos_similarity

def cosine_similarity_list(a: [float], b: [[float]]) -> float:
    return sum([cosine_similarity(a, x) for x in b])/len(b)
        


pandas.set_option('display.max_columns', None)

# https://georgepaskalev.medium.com/how-to-build-a-content-based-song-recommender-4346edbfa5cf
def test_function():
    column_names = ['track_name', 'energy', 'danceability', 'liveness', 'valence', 'speechiness', 'tempo']
    df = pandas.read_csv('high_popularity_spotify_data.csv', usecols=column_names)
    
    # We normalize the bpm by dividing every bpm by the highest bpm found in the dataset
    max_bpm = df['tempo'].max()
    df['tempo']= df['tempo'].apply(lambda x: x/max_bpm) 
    
    similar_songs = df.copy()
    test_song = df.copy()
    
    # only use tempo and energy for now
    # select only the tempo and energy columns
    sound_properties = similar_songs.loc[:,['energy', 'danceability', 'liveness', 'valence', 'speechiness', 'tempo']]

    #print(sound_properties)
    
    similar_songs['similarity with song'] = cosine_similarity(sound_properties, [0.765, 0.588, 0.2, 0.492, 0.0518, 130/200])
    similar_songs = similar_songs.sort_values(by=['similarity with song'], ascending=False)
    print(tabulate(similar_songs.head()))
    
    test_song['similarity with test song'] = cosine_similarity_list(sound_properties, [[0.5, 0.5, 0.5, 0.5, 0.5, 130/200],[0.765, 0.588, 0.2, 0.492, 0.0518, 130/200],[0.765, 0.588, 0.2, 0.492, 0.0518, 130/200]])
    test_song = test_song.sort_values(by=['similarity with test song'], ascending=False)
    print(tabulate(test_song.head()))
    
    
    
    #energy,tempo,danceability,playlist_genre,loudness,liveness,valence,track_artist,time_signature,speechiness,track_popularity,track_href,uri,track_album_name,playlist_name,analysis_url,track_id,track_name,track_album_release_date,instrumentalness,track_album_id,mode,key,duration_ms,acousticness,id,playlist_subgenre,type,playlist_id
    #0.765 ,145.988,0.588      ,gaming       ,-5.914,0.2,0.492,'League of Legends, NewJeans',4,0.0518          ,73,https://api.spotify.com/v1/tracks/210JJAa9nJOgNa0YNrsT5g,spotify:track:210JJAa9nJOgNa0YNrsT5g,GODS,Top Gaming Tracks,https://api.spotify.com/v1/audio-analysis/210JJAa9nJOgNa0YNrsT5g,210JJAa9nJOgNa0YNrsT5g,GODS,2023-10-04,3.23e-05,0rAaP1OBxVCn2cIUZNjGRs,0,3,220878,0.00685,210JJAa9nJOgNa0YNrsT5g,modern,audio_features,37i9dQZF1DWTyiBJ6yEqeu

test_function()


# energy,
# tempo,
# danceability,
# playlist_genre,
# loudness,
# liveness,
# valence,
# track_artist,
# time_signature,
# speechiness,
# track_popularity,
# track_href,
# uri,
# track_album_name,
# playlist_name,
# analysis_url,
# track_id,
# track_name,
# track_album_release_date,
# instrumentalness,
# track_album_id,
# mode,
# key,
# duration_ms,
# acousticness,
# id,
# playlist_subgenre,
# type,playlist_id

