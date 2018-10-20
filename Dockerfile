FROM node:8-alpine
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN apk add --no-cache bash
RUN npm install
COPY . /app
CMD node index.js
