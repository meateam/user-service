FROM node:10.15-slim
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm -g config set user root
COPY . .
RUN npm run build

FROM node:10.15-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=0 /usr/src/app/dist ./dist
COPY --from=0 /usr/src/app/protos ./protos
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
