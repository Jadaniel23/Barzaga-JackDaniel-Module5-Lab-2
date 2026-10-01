# Secure Dynamic Task Manager

ITP10 Event-Driven Programming laboratory project. Tasks are created and changed in the browser without a database or reload. The code is divided into data, utility, display, and main ES modules.

## Run the app

Because the JavaScript uses ES module imports, open the folder through a small local web server rather than a `file://` URL. From this directory, run:

```powershell
py -m http.server 8000
```

Then visit <http://localhost:8000> in your browser. Press Ctrl+C in the terminal to stop the server.

## Project structure

- `index.html` — accessible app controls and empty task list
- `css/style.css` — responsive layout and task states
- `js/app.js` — application behavior and event delegation
- `js/modules/data.js` — sample task data and validation message
- `js/modules/utils.js` — text validation and unique IDs
- `js/modules/display.js` — safe task element creation and live counts
- `screenshots/` — app-state evidence for the lab submission

All task text is inserted with `textContent`; task actions use one delegated click handler on the task list.
