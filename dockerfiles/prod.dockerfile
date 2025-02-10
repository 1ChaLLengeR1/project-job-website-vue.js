FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN rm -rf dist

RUN rm -rf node_modules/.vite

RUN npm run build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./dockerfiles/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]