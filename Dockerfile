FROM node:latest

ENV HOME=/home/pandora

COPY package*.json $HOME/app/

WORKDIR $HOME/app

RUN npm install --silent --progress=false

COPY . $HOME/app/

EXPOSE 3000

CMD ["npm", "run", "serve"]