FROM node:8-alpine

RUN mkdir -p /appdir
WORKDIR /appdir

COPY package.json /appdir
RUN npm install

RUN npm run build

COPY . /appdir

EXPOSE 9090
CMD [ "node", "server.js" ]