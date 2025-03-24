# Verwende das offizielle Node 22-alpine Image
FROM node:22-alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere package.json und yarn.lock (oder package-lock.json) in den Container
COPY package.json yarn.lock ./

# Installiere Abhängigkeiten (verwende Yarn oder npm – hier als Beispiel Yarn)
RUN yarn install --frozen-lockfile

# Kopiere den restlichen Code
COPY . .

# Baue die Next.js-App (erstellt den .next-Ordner)
RUN yarn build

# Exponiere den Port (Next.js läuft standardmäßig auf Port 3000)
EXPOSE 3000

# Starte die App im Produktionsmodus
CMD ["yarn", "start"]
