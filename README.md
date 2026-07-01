# Zurb Foundation 6.9.0 — WSC2026

A minimal static page using **Zurb Foundation 6.9.0** (WorldSkills 2026 Web Technologies, TP17).
The library is installed from npm at the pinned version and served by a tiny zero-dependency
Node static server.

## Run it

```bash
docker compose up --build
```

Then open **http://localhost:8080**. Stop it with `docker compose down`.

## Develop

You need **Node 24.1.0** and **npm 11.5.0** installed locally (the same versions the Docker image pins).

```bash
npm install
npm start
```

The server runs on **http://localhost:8080**. Edit **public/index.html** and refresh the browser to see changes.
The library is referenced from `/vendor/...`, which the server maps to `node_modules/...`.

## Stack

- Node 24.1.0 / npm 11.5.0
- Zurb Foundation 6.9.0
