FROM node:10.13.0-alpine

WORKDIR /usr/src/app
USER root

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

# COPY ./.env.local ./.env.local
# COPY ./.env.prod ./.env.prod

COPY ./public/ ./public/
COPY ./src/ ./src/

# USER node
EXPOSE 3000
CMD [ "npm", "run", "build" ]
