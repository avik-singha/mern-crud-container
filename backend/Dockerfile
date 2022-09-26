#Dockerfile for Node Server

#base image
FROM node:14.16-alpine

#Working Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 4000

CMD ["npm","start"]

