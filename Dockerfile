# the builder
FROM node:lts-alpine AS builder

ARG NODE_ENV=default
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache python make g++

RUN npm install


# the server
FROM node:lts-alpine

ARG NODE_ENV=default
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache bash coreutils

CMD ["npm", "start"]