FROM node:18.14.0-alpine as reactbuild
WORKDIR /react_build
COPY ../frontend/my-app/package*.json /react_build
RUN npm install
COPY ../frontend /react_build
RUN npm run build

FROM node:18.14.0-alpine as serverbuild
WORKDIR /feserver
COPY feserver/package.json ./
RUN npm install
COPY feserver/ .
COPY --from=reactbuild febuild/build/ ./static
EXPOSE 3000
CMD ["node", "server.js"]
