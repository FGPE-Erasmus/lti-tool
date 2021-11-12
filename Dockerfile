# the builder
FROM node:lts-alpine AS builder

ARG NODE_ENV=default
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

RUN apk add --no-cache py-pip make g++

COPY package*.json ./

RUN npm install


# the server
FROM node:lts-alpine

ARG NODE_ENV=default
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

RUN apk add --no-cache bash coreutils

COPY --from=builder /usr/app/node_modules node_modules

COPY . .

CMD ["npm", "start"]
