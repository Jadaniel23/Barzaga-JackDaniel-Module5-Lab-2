# Secure Dynamic Task Manager

ITP10 Event-Driven Programming laboratory project. Tasks are created and edited in the browser without a database or reload. Task text is always inserted as text, never interpreted as HTML.

## Run locally

The JavaScript uses ES module imports, so serve this folder over HTTP instead of opening `index.html` as a `file://` URL. From this directory, run:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>. Stop the server with Ctrl+C.

## Module layout

- `js/modules/data.js` stores the required sample tasks and validation message.
- `js/modules/utils.js` validates task text and generates unique task IDs.
- `js/modules/display.js` creates task elements safely and updates the live counts.
- `js/app.js` handles application actions and the single delegated task-list click event. It imports and exports the named lab functions.

## Evidence

- `screenshots/initial-empty.png` — empty initial state and zero counts.
- `screenshots/empty-task-validation.png` — exact blank-task validation message.
- `screenshots/safe-text-rendering.png` — HTML-like input shown literally as text.
- `screenshots/task-actions-and-counts.png` — completed and edited tasks with live counts.
- `TEST_RESULTS.md` — browser verification results for the required behaviors.
