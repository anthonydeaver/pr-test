FROM node:11.12.0-alpine

RUN mkdir -p  /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN yarn install

COPY src/ /usr/src/app

USER node

CMD ["node", "index.js"]