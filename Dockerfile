FROM node:16.18.1

RUN apt-get install libcurl4

WORKDIR /app

COPY --chown=node:node . /app

RUN npm install --ci