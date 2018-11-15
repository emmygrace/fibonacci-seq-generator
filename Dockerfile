FROM node:8-alpine

RUN mkdir -p /appdir
WORKDIR /appdir

COPY package.json /appdir
RUN npm install

COPY . /appdir

RUN npm run build

EXPOSE 9090
CMD [ "node", "server.js" ]