import csv

#  https://georgepaskalev.medium.com/how-to-build-a-content-based-song-recommender-4346edbfa5cf

import pandas


from dataclasses import dataclass


# default values
@dataclass
class filters:
    genreFilter: list[str]
    bpmRange: tuple[int, int]

    def __post_init__(self):
        if self.genreFilter is None or self.genreFilter == [""]:
            self.genreFilter = []
        if self.bpmRange is None:
            self.bpmRange = [0, 999]

    
    def getFilteredData(self, data: pandas.DataFrame) -> pandas.DataFrame:

        if self.genreFilter:
            return data[
                data["genre"].isin(self.genreFilter)
                & (data["tempo"] >= self.bpmRange[0])
                & (data["tempo"] <= self.bpmRange[1])
            ]
        return data[
            (data["tempo"] >= self.bpmRange[0]) & (data["tempo"] <= self.bpmRange[1])
        ]


import numpy as np

def cosine_similarity(matrix, vector):
    similarity = np.dot(matrix, vector) / (np.linalg.norm(matrix, axis=1) * np.linalg.norm(vector) + 1e-10)
    return similarity

def get_average_vector(ls: [[]]):
    out = [0] * len(ls[0])
    for vector in ls:
        out = [a + b for (a, b) in zip(out, vector)]
    out = [x / len(ls) for x in out]
    return out


def get_recommendations_based_on_songs(
    songs: list[list[float]], df: pandas.DataFrame = None, songCount: int = -1
) -> pandas.DataFrame:
    """
    :param songs: This is a list of songs that the recommendation will be based on
    :param df: the dataframe containing the songs
    :return: pandas.DataFrame, recommendations
    """
    if df is None:
        column_names = [
            "track_id",
            "track_name",
            "artist_name",
            "genre",
            "energy",
            "danceability",
            "liveness",
            "valence",
            "speechiness",
            "tempo",
        ]
        df = pandas.read_csv(".\src\Backend\spotify_data.csv", usecols=column_names)

    df["tempo"] = df["tempo"] / 250

    songs = get_average_vector(songs)
    
    df.loc[:, "similarity"] = cosine_similarity(
        df.loc[
            :,
            ["energy", "danceability", "liveness", "valence", "speechiness", "tempo"]
        ],
        songs,
    )    

    df = df.drop_duplicates(subset=["track_name", "artist_name"]).sort_values(
        by=["similarity"], ascending=False
    )

    # get the first n songs if a songcount is given
    if songCount != -1:
        df = df.head(songCount)

    return df


# def get_recommendations_based_on_custom_values(
#     energy: float,
#     danceability: float,
#     liveness: float,
#     speechiness: float,
#     df: pandas.DataFrame = None,
# ) -> pandas.DataFrame:
#     return get_recommendations_based_on_songs(
#         [energy, danceability, liveness, speechiness], df, 10
#     )

def get_song_properties(df: pandas.DataFrame, track_id: int):
    track = df.loc[df["track_id"] == track_id]
    return track

pandas.set_option("display.max_columns", None)