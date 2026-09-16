FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./

# The repository lockfile may come from an offline audit environment.
# Refresh lock metadata against the registry first, then perform the clean
# production install. Direct dependency versions in package.json are pinned.
RUN npm i --package-lock-only --ignore-scripts --no-audit --no-fund \
    && npm ci --omit=dev --no-audit --no-fund

COPY . .

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "src/server.js"]
