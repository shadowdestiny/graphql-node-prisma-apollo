FROM node:14-alpine as nodejs

WORKDIR /usr/src/app

RUN mkdir -p /app && chown node: /app

RUN npm install -g prisma \
    && npm install -g parallel \
    && npm install -g @2fd/graphdoc

RUN apk add --no-cache bash

# Todo: not needed at this time for a dockerfile dev
#EXPOSE 8080

#CMD ["npm","run","init"]
