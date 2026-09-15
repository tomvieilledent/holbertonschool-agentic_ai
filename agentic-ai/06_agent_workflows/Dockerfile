FROM node:20.17.0-alpine3.20

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node index.js ./

ENV NODE_ENV=production

USER node

CMD ["node", "index.js"]
