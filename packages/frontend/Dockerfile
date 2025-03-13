# Verwende ein Node.js Image als Basis (z.B. LTS Version)
FROM node:22-alpine

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere package.json (und yarn.lock, falls vorhanden) in das Arbeitsverzeichnis
COPY package.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes (falls noch leer, dann bleibt es leer)
COPY . .

# Starte den Entwicklungsserver (hier als Platzhalter)
CMD ["npm", "run", "dev"]
