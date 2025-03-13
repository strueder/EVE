FROM node:22-alpine

WORKDIR /app

# Corepack aktivieren, um Yarn zu verwenden (ab Node 16.10+ enthalten)
RUN corepack enable

# Kopiere package.json und yarn.lock (falls vorhanden) in den Container
COPY package.json yarn.lock ./

# Installiere die Abhängigkeiten über Yarn
RUN yarn install --frozen-lockfile

# Kopiere den restlichen Code
COPY . .

# Baue dein Projekt (angenommen, du hast ein Build-Skript in package.json definiert)
RUN yarn build

# Starte den Bot (hier wird angenommen, dass der kompiliert Code im Ordner "dist" liegt)
CMD ["node", "dist/index.js"]
