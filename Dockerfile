# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS development
RUN npm ci
COPY . .
EXPOSE 44100
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production \
    PORT=44100
RUN npm install --global serve@14
COPY --from=build /app/dist ./dist
USER node
EXPOSE 44100
CMD ["serve", "-s", "dist", "-l", "44100"]
