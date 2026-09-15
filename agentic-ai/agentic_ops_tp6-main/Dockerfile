FROM node:20-alpine

WORKDIR /app

# Copy only application code (do NOT bake tasks.json into the image)
# and set ownership to the non-root `node` user present in the official image.
COPY --chown=node:node package.json ./
COPY --chown=node:node watcher.js ./

ENV NODE_ENV=production

# Run as non-root user
USER node

CMD ["node", "watcher.js"]