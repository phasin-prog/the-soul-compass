import sqlite3
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DB = os.path.expanduser(r"~\.local\share\mimocode\mimocode.db")
db = sqlite3.connect(DB)
db.row_factory = sqlite3.Row
c = db.cursor()

# Focus on key sessions - just get tool calls and their full data
key_sessions = [
    'ses_10ad0bf70ffePQPtsktCgHZmhz',  # Compose Agent skills/workflow
    'ses_10ad640ddffemh1LkttN6nmYGN',  # Studio refactor
    'ses_11615f44effe4OUHgfHFmAazWZ',  # History work continuation
    'ses_11615f544ffe6gd3ALZWe2jBg7',  # Project instructions creation
    'ses_11615f6d2ffemfdSXJd2FE40oC',  # Full rebuild + skills
]

for sid in key_sessions:
    print(f"\n{'='*80}")
    print(f"SESSION: {sid}")
    print(f"{'='*80}")
    
    c.execute("SELECT title FROM session WHERE id = ?", (sid,))
    r = c.fetchone()
    title = r[0] if r else "unknown"
    print(f"Title: {title}")
    
    # Get tool parts - extract just what we need from JSON
    c.execute("""
        SELECT m.id as msg_id,
               json_extract(p.data, '$.tool') as tool,
               json_extract(p.data, '$.state.input') as input_json,
               json_extract(p.data, '$.state.output') as output_json
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(p.data, '$.type') = 'tool'
          AND json_extract(p.data, '$.tool') IN ('write', 'edit')
        ORDER BY m.time_created, p.time_created
        LIMIT 60
    """, (sid,))
    
    for r in c.fetchall():
        tool = r['tool']
        inp = r['input_json']
        if not inp:
            continue
            
        try:
            inp_dict = json.loads(inp)
        except:
            # Truncated - just extract filePath
            if 'filePath' in str(inp)[:500]:
                fp_start = str(inp).find('"filePath"')
                if fp_start > 0:
                    fp_chunk = str(inp)[fp_start:fp_start+200]
                    print(f"  {tool.upper()}: (truncated) {fp_chunk[:100]}")
                continue
            continue
            
        if tool == 'write':
            fp = inp_dict.get('filePath', '?')
            content_len = len(inp_dict.get('content', ''))
            # Get first line of content
            content_preview = inp_dict.get('content', '')[:120].replace('\n', ' ')
            print(f"  WRITE: {fp}")
            print(f"    Content ({content_len} chars): {content_preview}...")
        elif tool == 'edit':
            fp = inp_dict.get('filePath', '?')
            old = inp_dict.get('oldString', '')[:100].replace('\n', ' ')
            new = inp_dict.get('newString', '')[:100].replace('\n', ' ')
            print(f"  EDIT: {fp}")
            print(f"    old: {old}...")
            print(f"    new: {new}...")

db.close()
