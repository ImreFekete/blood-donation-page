FROM node:18.14.0-alpine as react-build
WORKDIR /react_build
COPY ../frontend/my-app/package*.json /react_build
RUN npm install
COPY ../frontend /react_build
RUN npm run build
