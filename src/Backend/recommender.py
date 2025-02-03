import csv

with open('src\Backend\high_popularity_spotify_data.csv', mode = 'r') as file:
    csvFile = csv.reader(file)
    print(type(csvFile))

import pandas
columns = ["tempo", "energy"]
csvFile = pandas.read_csv('src\Backend\high_popularity_spotify_data.csv', usecols=columns)
#print(csvFile)


def test():
    return (csvFile["tempo"] > 120) & (csvFile["energy"] > 0.7)

filtered = csvFile[test()]


print(filtered.iloc[0:2])

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
            data["playlist_genre"].isin(self.genreFilter) &
            (data["tempo"] >= self.bpmRange[0]) &
            (data["tempo"] <= self.bpmRange[1])
            ]
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

