FROM node

RUN mkdir -p /appdir
WORKDIR /appdir

COPY package.json /appdir
RUN npm install

RUN npm build

COPY . /appdir

EXPOSE 8080
CMD [ "node", "server.js" ]