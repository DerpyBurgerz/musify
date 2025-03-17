import recommender
import pandas


import numpy as np


def cosine_similarity(a: [float], b: [float]) -> float:
    cos_similarity = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    return cos_similarity


def get_average_vector(ls: [[]]):
    out = [0] * len(ls[0])
    for vector in ls:
        out = [a + b for (a, b) in zip(out, vector)]
    out = [x / len(ls) for x in out]
    return out


def test_function():
    """
    This function is purely for testing purposes.
    This should not be called from anywhere else.
    """
    column_names = [
        "track_name",
        "energy",
        "danceability",
        "liveness",
        "valence",
        "speechiness",
        "tempo",
    ]
    df = pandas.read_csv("high_popularity_spotify_data.csv", usecols=column_names)

    # We normalize the bpm by dividing every bpm by the highest bpm found in the dataset
    max_bpm = df["tempo"].max()
    df["tempo"] = df["tempo"] / max_bpm

    our_songs = [
        [0.5, 0.5, 0.5, 0.5, 0.5, 130 / 200],
        [0.765, 0.588, 0.2, 0.492, 0.0518, 130 / 200],
        [0.765, 0.588, 0.2, 0.492, 0.0518, 130 / 200],
    ]
    our_songs = get_average_vector(our_songs)

    similar_songs = df.copy()
    test_song = df.copy()

    # only use tempo and energy for now
    # select only the tempo and energy columns
    sound_properties = similar_songs.loc[
        :, ["energy", "danceability", "liveness", "valence", "speechiness", "tempo"]
    ]

    # print(sound_properties)

    similar_songs["similarity with song"] = cosine_similarity(
        sound_properties, [0.765, 0.588, 0.2, 0.492, 0.0518, 130 / 200]
    )
    similar_songs = similar_songs.sort_values(
        by=["similarity with song"], ascending=False
    )
    # print(tabulate(similar_songs.head()))

    test_song["similarity with test song"] = cosine_similarity(
        sound_properties, our_songs
    )
    test_song = test_song.sort_values(by=["similarity with test song"], ascending=False)
    # print(tabulate(test_song.head()))
