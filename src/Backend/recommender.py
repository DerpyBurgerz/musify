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

