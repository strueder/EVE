#!/bin/bash
# Pfad zum Repository
cd /home/marvin/eve || exit 1
eval "$(ssh-agent -s)"
# Schlüssel des deploy-Benutzers hinzufügen
ssh-add /home/deploy/.ssh/deploy
ssh -T git@github.com
# Stelle sicher, dass der prod-Branch ausgecheckt ist
git checkout prod

# Hole den neuesten Stand des prod-Branches vom Remote-Repository
git pull origin prod

# Git-Update durchführen
git pull

# Docker-Images neu bauen und Container im Hintergrund starten
docker-compose build
docker-compose up -d