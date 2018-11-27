FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./
RUN  npm install 
ENV PORT 9000

COPY . .

EXPOSE 9000

RUN export port=${PORT}


ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait ./wait
RUN chmod +x ./wait

CMD ./wait && npm start



