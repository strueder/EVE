# EVE

EVE ist ein Monorepo-Projekt, das ein komplettes System für einen Discord-Bot mit Web-Dashboard umfasst. Das Repository besteht aus drei Haupt-Komponenten:

- **Frontend:** Eine Next.js-Anwendung (React-basiert) für das Dashboard.
- **Backend:** Ein Express-Server (mit TypeScript; migrierbar zu NestJS) als API-Gateway.
- **Discord-Bot:** Ein Discord-Bot, entwickelt mit discord.js und TypeScript.

## Tech-Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Node.js, Express (mit TypeScript) – später migrierbar zu NestJS
- **Discord-Bot:** discord.js, TypeScript
- **Monorepo-Management:** Yarn Workspaces + Lerna
- **Deployment:** Docker & Docker Compose
- **CI/CD:** GitHub Actions (automatisiertes Deployment)

## Installation

1. **Repository klonen:**

   ```bash
   git clone https://github.com/dein-benutzername/eve.git
   cd eve
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   yarn install
   ```

3. **Umgebungsvariablen konfigurieren:**

   ```bash
   mkdir -p ENV
   touch ENV/.env.frontend ENV/.env.backend ENV/.env.discord-bot
   ```

   Beispiel für **ENV/.env.discord-bot**:

   ```env
   DISCORD_TOKEN=deinDiscordToken
   DISCORD_CLIENT_ID=deineClientID
   ```

## Lokale Entwicklung

### Frontend

```bash
cd packages/frontend
npm run dev
```

### Backend

```bash
cd packages/backend
npm run dev
```

### Discord-Bot

```bash
cd packages/discord-bot
npm run dev
```

## Deployment

### `docker-compose.yml`

```yaml
version: "3.8"

services:
  frontend:
    build: ./packages/frontend
    ports:
      - "3000:3000"
  backend:
    build: ./packages/backend
    ports:
      - "4000:4000"
  discord-bot:
    build: ./packages/discord-bot
```

### `deploy.sh`

```bash
#!/bin/bash
cd /pfad/zu/eve || exit 1
git checkout prod
git pull origin prod
docker-compose build
docker-compose up -d
```

### GitHub Actions Workflow (`deploy.yml`)

```yaml
name: Deploy to VPS

on:
  push:
    branches:
      - prod

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}

      - name: Deploy to VPS
        run: |
          ssh -o StrictHostKeyChecking=no -p ${{ secrets.VPS_PORT }} ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }} "cd /pfad/zu/eve && ./deploy.sh"
```

## GitHub Secrets

- **VPS_SSH_PRIVATE_KEY** – Privater SSH-Schlüssel für Deployment-User.
- **VPS_USER** – VPS-Benutzername (z. B. `deploy`).
- **VPS_HOST** – IP oder Domain des VPS.
- **VPS_PORT** – SSH-Port.

## Zusammenfassung

EVE ist ein Monorepo mit einem Next.js-Frontend, einem Express-Backend und einem Discord-Bot, verwaltet mit Yarn Workspaces und Lerna. Das Deployment erfolgt mit Docker Compose und GitHub Actions.
