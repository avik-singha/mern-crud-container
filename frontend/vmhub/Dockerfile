#Dockerfile for React client

#base image
FROM node:14.15.3-alpine3.12

#Working Directory
WORKDIR /src/

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]

