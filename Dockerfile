FROM node:20-alpine as build
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine as start
WORKDIR /app

COPY --from=build /app/build ./build
COPY package*.json ./
RUN npm install --only=production

EXPOSE 9000
CMD [ "npm", "run", "start:build" ]