FROM node:18-alpine

RUN mkdir -p /usr/src/app/site

WORKDIR /usr/src/app/site

COPY . .

RUN yarn install

COPY . .