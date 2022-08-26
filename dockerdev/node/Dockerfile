FROM node:14-alpine as nodejs

WORKDIR /usr/src/app

RUN mkdir -p /app && chown node: /app

RUN npm install -g prisma \
    && npm install @prisma/client \
    && npm i --quiet \
    && npm install -g parallel

RUN apk add --no-cache bash

EXPOSE 8080

CMD ["npm","run","init"]
