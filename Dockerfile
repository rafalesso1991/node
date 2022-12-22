FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV=prod

EXPOSE 8000

CMD ["npm","start"]