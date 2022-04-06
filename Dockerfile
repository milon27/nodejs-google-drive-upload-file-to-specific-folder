FROM node:16.3-alpine

WORKDIR /app

ENV CONFIG_PATH=./config
ENV CREDENTIAL_FILE_NAME=credentials.json
ENV TOKEN_FILE_NAME=token.json
# ENV BACKUP_FILE_NAME=from compose

COPY package*.json .
RUN npm ci

COPY . .

CMD [ "node","index.js" ]
