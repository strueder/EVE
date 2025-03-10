FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Platzhalter-Befehl für den Discord-Bot
CMD ["npm", "run", "dev"]
