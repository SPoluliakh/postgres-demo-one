FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

RUN docker-compose up

EXPOSE 3000

COPY . .

CMD [ "npm",  "start" ]