import sqlite3
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DB = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
db = sqlite3.connect(DB)
db.row_factory = sqlite3.Row
c = db.cursor()

# Check what tool types exist
key_sessions = [
    'ses_10ad0bf70ffePQPtsktCgHZmhz',
    'ses_10ad640ddffemh1LkttN6nmYGN',
    'ses_11615f44effe4OUHgfHFmAazWZ',
    'ses_11615f544ffe6gd3ALZWe2jBg7',
    'ses_11615f6d2ffemfdSXJd2FE40oC',
]

for sid in key_sessions:
    print(f"\n=== SESSION: {sid} ===")
    c.execute("""
        SELECT json_extract(p.data, '$.type') as part_type,
               json_extract(p.data, '$.tool') as tool,
               count(*) as cnt
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
        GROUP BY part_type, tool
        ORDER BY cnt DESC
    """, (sid,))
    
    for r in c.fetchall():
        print(f"  type={r['part_type']} tool={r['tool']} count={r['cnt']}")

# Also check: do these sessions have tool-call parts at all?
print("\n=== SAMPLE PART DATA from ses_11615f544ffe ===")
c.execute("""
    SELECT json_extract(p.data, '$.type') as pt, 
           json_extract(p.data, '$.tool') as tool,
           substr(p.data, 1, 500) as preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = 'ses_11615f544ffe6gd3ALZWe2jBg7'
      AND json_extract(m.data, '$.role') = 'assistant'
    ORDER BY m.time_created, p.time_created
    LIMIT 20
""")
for r in c.fetchall():
    print(f"  pt={r['pt']} tool={r['tool']}")
    if r['pt'] == 'tool':
        print(f"    preview: {r['preview'][:300]}")

db.close()
