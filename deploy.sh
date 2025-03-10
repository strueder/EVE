#!/bin/bash
# Pfad zum Repository
cd /home/marvin/eve || exit 1

# Git-Update durchführen
git pull

# Docker-Images neu bauen und Container im Hintergrund starten
docker-compose build
docker-compose up -d