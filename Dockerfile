# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS development
RUN npm ci
COPY . .
ENV NODE_ENV=development
EXPOSE 44100
CMD ["npm", "run", "hmr"]

FROM base AS production-dependencies
RUN npm ci --omit=dev

FROM node:24-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production \
    PORT=44100
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.json server.ts ./
COPY app ./app
COPY public ./public
USER node
EXPOSE 44100
CMD ["npm", "run", "start"]
