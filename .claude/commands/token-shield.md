# token-shield

Token protection protocol for this session. Apply at the START of any session involving multi-file projects, design systems, iterative builds, or tasks likely to span more than 3 exchanges.

## Session Rules (activate now)

### Reading
- Read ONLY files explicitly needed for the current task
- Never read entire directories speculatively
- For large files: read only the relevant section (use offset/limit)
- Never re-read a file you just edited — the edit succeeded or it errored

### Writing
- Write minimum code to satisfy the requirement (see `/ponytail`)
- No scaffolding files not needed NOW
- No TODO stubs that aren't functional

### Tool Calls
- Batch independent tool calls in one message — never serialize what can parallelize
- Prefer dedicated tools over shell commands (Glob > find, Grep > grep, Read > cat)
- Never retry a denied tool call verbatim — adjust then retry

### Responses
- Skip filler acknowledgments ("You're right!", "Great question!")
- Skip restating the task before working on it
- Skip end-of-task summaries longer than 3 lines unless asked
- Code changes → state what changed, not what you did

### Context hygiene
- If context is growing large: summarize completed work, forget it, move forward
- Don't carry finished-task details into new tasks
- Use `/compact` when context feels bloated

## What This Does NOT Cut
- Accuracy
- Safety checks
- Reasoning before acting on irreversible operations
- Asking when genuinely ambiguous

## Usage
`/token-shield` — activate for this session  
`/token-shield off` — deactivate
