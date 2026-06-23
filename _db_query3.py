import sqlite3
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DB = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
db = sqlite3.connect(DB)
db.row_factory = sqlite3.Row
c = db.cursor()

# Get user messages for non-checkpoint sessions on current project
ses_ids = [
    'ses_10ad0bf70ffePQPtsktCgHZmhz',
    'ses_10ad640ddffemh1LkttN6nmYGN',
    'ses_11615f44effe4OUHgfHFmAazWZ',
    'ses_11615f544ffe6gd3ALZWe2jBg7',
    'ses_11615f6d2ffemfdSXJd2FE40oC',
    'ses_11615f480ffet03Ay1D3Gmm163',
]

for sid in ses_ids:
    print(f"\n=== SESSION: {sid} ===")
    c.execute("""
        SELECT m.id, json_extract(m.data, '$.role') as role, p.time_created,
               json_extract(p.data, '$.type') as part_type,
               substr(json_extract(p.data, '$.text'), 1, 300) as text_preview
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(p.data, '$.type') = 'text'
        ORDER BY m.time_created, p.time_created
        LIMIT 40
    """, (sid,))
    for r in c.fetchall():
        role = r['role']
        preview = r['text_preview'][:200] if r['text_preview'] else ""
        if role == 'user':
            print(f"  USER: {preview}")
        else:
            print(f"  ASST: {preview[:200]}")

db.close()
