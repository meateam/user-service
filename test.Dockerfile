FROM node:10.16-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "run", "run_tests"]