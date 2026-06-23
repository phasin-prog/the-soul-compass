import sqlite3
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DB = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
db = sqlite3.connect(DB)
db.row_factory = sqlite3.Row
c = db.cursor()

# Current project sessions (The souls Compass - Re)
DIR = "C:\\Users\\User\\Desktop\\The souls Compass - Re"
print(f"=== SESSIONS for {DIR} ===")
c.execute("SELECT id, title, time_created FROM session WHERE directory = ? ORDER BY time_created DESC", (DIR,))
sessions = c.fetchall()
for r in sessions:
    t = r[1] if r[1] else "no title"
    print(f"  {r[0]} | {t} | {r[2]}")

# Check task table columns
print("\n=== TASK COLUMNS ===")
c.execute("PRAGMA table_info(task)")
for r in c.fetchall():
    print(f"  {r['name']} ({r['type']})")

# Tasks for current project sessions
print("\n=== TASKS for current project sessions ===")
ses_ids = [r[0] for r in sessions if not r[1].startswith("checkpoint-writer")]
for sid in ses_ids[:10]:
    c.execute("SELECT * FROM task WHERE session_id = ?", (sid,))
    tasks = c.fetchall()
    if tasks:
        for t in tasks:
            print(f"  Session: {sid}")
            print(f"    Task: {dict(t)}")
    else:
        pass

# Check task_event
print("\n=== TASK_EVENT COLUMNS ===")
c.execute("PRAGMA table_info(task_event)")
for r in c.fetchall():
    print(f"  {r['name']} ({r['type']})")

db.close()
