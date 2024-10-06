FROM node:20

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

ENV $(cat .env)

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]