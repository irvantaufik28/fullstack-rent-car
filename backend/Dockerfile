FROM node:16

WORKDIR /app

COPY package*.json ./
RUN yarn install --silent

COPY . ./

EXPOSE 5430

CMD ["yarn", "start:dev"]
