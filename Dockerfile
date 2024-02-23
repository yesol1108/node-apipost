FROM registry.access.redhat.com/ubi8/nodejs-20

USER 0
RUN fix-permissions ./
USER 1001

RUN mkdir ./app
WORKDIR $HOME/app
COPY package.json .
RUN npm install
COPY node_modules ./node_modules
COPY public ./public
COPY views ./views
COPY . ./

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]