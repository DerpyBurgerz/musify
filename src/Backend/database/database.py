import sqlite3

DB_NAME = "src/Backend/database/database.db"


def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def get_user(id):
    conn = get_db_connection()
    with conn:
        user = conn.execute("SELECT * from users WHERE id = ?", (id,)).fetchone()

    if user:
        user = dict(user)
        user["genres"] = user["genres"].split(",")
        return user
    return None


def create_user(
    id, energy, danceability, liveness, valence, speechiness, tempo, genres
):
    conn = get_db_connection()
    with conn:
        genres_string = ",".join(genres) if genres else ""
        conn.execute(
            "INSERT INTO users (id, energy, danceability, liveness, valence, speechiness, tempo, genres) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                id,
                energy,
                danceability,
                liveness,
                valence,
                speechiness,
                tempo,
                genres_string,
            ),
        )


def clear_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users")
    conn.commit()
    conn.close()
