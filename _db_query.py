import sqlite3
import json
import os
import sys

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

DB = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
db = sqlite3.connect(DB)
db.row_factory = sqlite3.Row
c = db.cursor()

# 1. Schema overview
print("=== TABLES ===")
c.execute("SELECT name FROM sqlite_master WHERE type='table'")
for r in c.fetchall():
    print(r[0])

# 2. List sessions (all)
print("\n=== SESSIONS (all) ===")
c.execute("SELECT id, directory, title, time_created FROM session ORDER BY time_created DESC")
for r in c.fetchall():
    d = r[1] if r[1] else "none"
    t = r[2] if r[2] else "no title"
    print(f"  {r[0]} | dir={d} | title={t} | {r[3]}")

# 3. Session count
c.execute("SELECT count(*) FROM session")
print(f"\nTotal sessions: {c.fetchone()[0]}")

# 4. Message count
c.execute("SELECT count(*) FROM message")
print(f"Total messages: {c.fetchone()[0]}")

# 5. Current project sessions - find which project id this is
print("\n=== PROJECT TABLE ===")
c.execute("SELECT * FROM project")
for r in c.fetchall():
    print(f"  {dict(r)}")

# 6. Task table
print("\n=== RECENT TASKS ===")
try:
    c.execute("SELECT id, session_id, title, status, time_created FROM task ORDER BY time_created DESC LIMIT 20")
    for r in c.fetchall():
        print(f"  {r[0]} | ses={r[1]} | title={r[2]} | status={r[3]} | {r[4]}")
except Exception as e:
    print(f"  Error: {e}")

db.close()
