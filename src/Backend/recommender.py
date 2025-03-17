import csv
from tabulate import tabulate

#https://georgepaskalev.medium.com/how-to-build-a-content-based-song-recommender-4346edbfa5cf

# with open('.\src\Backend\high_popularity_spotify_data.csv', mode = 'r') as file:
#     csvFile = csv.reader(file)
#     print(type(csvFile))

import pandas
# columns = ['tempo', 'energy']
# csvFile = pandas.read_csv('.\src\Backend\high_popularity_spotify_data.csv', usecols=columns)
# #print(csvFile)


# def test():
#     return (csvFile['tempo'] > 120) & (csvFile['energy'] > 0.7)

# filtered = csvFile[test()]


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

def get_average_vector(ls: [[]]):
    out = [0] * len(ls[0])
    for vector in ls:
        out = [a + b for (a, b) in zip(out, vector)]
    out = [x/len(ls) for x in out]
    return out


def get_recommendations_based_on_songs(songs: [[float]], df: pandas.DataFrame = None, songCount: int = -1) -> pandas.DataFrame:
    """
    :param songs: This is a list of songs that the recomendation will be based on
    :param df: the dataframe containing the songs
    :return: pandas.DataFrame, recommendations
    """
    if df is None:
        column_names = ['track_name', 'energy', 'danceability', 'liveness', 'valence', 'speechiness', 'tempo']
        df = pandas.read_csv('.\src\Backend\high_popularity_spotify_data.csv', usecols=column_names)
        
        max_bpm = df['tempo'].max()
        df['tempo'] = df['tempo']/max_bpm
    
    songs = get_average_vector(songs)
    df['similarity'] = cosine_similarity(df.loc[:, df.columns != 'track_name'], songs)

    df = df.sort_values(by=['similarity'], ascending=False)
    df = df.head(songCount)

    return df

def get_recommendations_based_on_custom_values(energy: float, danceability: float, liveness: float, speechiness: float, df: pandas.DataFrame = None) -> pandas.DataFrame:
    return get_recommendations_based_on_songs([energy, danceability, liveness, speechiness], df, 10)


pandas.set_option('display.max_columns', None)
# test_function()
# print(tabulate(get_recommendations_based_on_songs([[0.5, 0.5, 0.5, 0.5, 0.5, 130/200],[0.765, 0.588, 0.2, 0.492, 0.0518, 130/200],[0.765, 0.588, 0.2, 0.492, 0.0518, 130/200]])))
