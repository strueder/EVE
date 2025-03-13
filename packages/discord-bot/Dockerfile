FROM node:18-alpine

WORKDIR /app

# Corepack aktivieren, um Yarn zu verwenden (ab Node 16.10+ enthalten)
RUN corepack enable

# Kopiere package.json und yarn.lock (falls vorhanden) in den Container
COPY . .

# Installiere die Abhängigkeiten über Yarn
RUN yarn install

# Kopiere den restlichen Code

# Baue dein Projekt (angenommen, du hast ein Build-Skript in package.json definiert)


# Starte den Bot (hier wird angenommen, dass der kompiliert Code im Ordner "dist" liegt)
CMD ["yarn", "dev"]
