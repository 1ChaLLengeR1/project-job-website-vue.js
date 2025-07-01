#!/bin/bash

set -e

APP_VERSION=$1

if [ -z "$APP_VERSION" ]; then
  echo "Podaj wersję jako argument. Przykład: ./swarm_deploy_frontend.sh 1.0.1"
  exit 1
fi

LOG_FILE="swarm_deploy_frontend.log"
DOCKER_USER="arturscibor"
DOCKER_REPO="praca.strona.arturscibor.pl"
FULL_IMAGE_NAME="$DOCKER_USER/$DOCKER_REPO:$APP_VERSION"

echo ">>> Pobieranie obrazu z Docker Huba: $FULL_IMAGE_NAME ..."
docker pull $FULL_IMAGE_NAME
docker tag $FULL_IMAGE_NAME $DOCKER_USER/$DOCKER_REPO:latest

echo ">>> Deploy stacka do Swarma..."
docker stack deploy -c prod.swarm.docker-compose.yaml spinetime_frontend

echo ">>> Usuwanie nieużywanych obrazów..."
docker image prune -f

DEPLOY_DATE=$(date '+%Y-%m-%d %H:%M:%S')
DEPLOY_MESSAGE="✅ Frontend Swarm deploy zakończony. Wersja: $APP_VERSION, Data: $DEPLOY_DATE"

echo ">>> $DEPLOY_MESSAGE"
echo "$DEPLOY_MESSAGE" >> "$LOG_FILE"
