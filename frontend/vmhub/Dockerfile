#Dockerfile for React client

#base image
FROM node:14.16-alpine

#Working Directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]

