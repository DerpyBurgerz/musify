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
@dataclass (genreFilter = [], 
            bpmRange = [0, 999], 
            ) 
class filters:
    genreFilter: list[str]
    bpmRange: tuple[int, int]

    def getFilteredData(self, data: pandas.DataFrame) -> pandas.DataFrame:
        return data[
            data["genre"].isin(self.genreFilter)
            (data["tempo"] >= self.bpmRange[0]) & (data["tempo"] <= self.bpmRange[1])
            ]
