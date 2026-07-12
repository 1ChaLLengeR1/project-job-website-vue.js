# Etap 1: Instalacja zależności
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --prefer-offline

# Etap 2: Build aplikacji.
# Vite wypieka zmienne VITE_* do bundla w trakcie builda — muszą przyjść jako
# build-arg (z Dopplera w CI), w runtime kontenera nie da się ich już podmienić.
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG VITE_URL_SERVER
ENV VITE_URL_SERVER=${VITE_URL_SERVER}

RUN rm -rf dist node_modules/.vite

RUN yarn build

# Etap 3: Serwowanie statyków przez nginx
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY infra/dockerfiles/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
