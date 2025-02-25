FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN rm -rf dist node_modules/.vite

RUN yarn build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./dockerfiles/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]