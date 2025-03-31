import sqlite3

DB_NAME = 'src/Backend/database/database.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def get_user(id):
    conn = get_db_connection()
    with conn:
        user =  conn.execute('SELECT * from users WHERE id = ?', (id,)).fetchone()
    return user

def create_user(id, energy, danceability, liveness, valence, speechiness, tempo):
    conn = get_db_connection()
    with conn:
        conn.execute('INSERT INTO users (id, energy, danceability, liveness, valence, speechiness, tempo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                     (id, energy, danceability, liveness, valence, speechiness, tempo))
        
def clear_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM users')
    conn.commit()
    conn.close()