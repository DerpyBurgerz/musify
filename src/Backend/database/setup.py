import sqlite3

DB_NAME = "src/Backend/database/database.db"

conn = sqlite3.connect(DB_NAME)
c = conn.cursor()

c.execute(
    """
  CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      energy FLOAT,
      danceability FLOAT,
      liveness FLOAT,
      valence FLOAT,
      speechiness FLOAT,
      tempo FLOAT,
      genres TEXT
  )
  """
)

conn.commit()
conn.close()

print("Created DB")
