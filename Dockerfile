FROM node:20-alpine3.18

RUN mkdir /app

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
EXPOSE 3000

CMD ["node", "app.js"]