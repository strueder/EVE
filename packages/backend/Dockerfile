FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Platzhalter-Befehl für den Backend-Server
CMD ["npm", "run", "dev"]
