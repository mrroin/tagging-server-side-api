FROM node:21-alpine3.17 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock .env ./
RUN yarn install --frozen-lockfile

FROM node:21-alpine3.17 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:21-alpine3.17 AS runner
WORKDIR /usr/src/app
COPY package.json yarn.lock .env ./
RUN yarn install --prod
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 8080
ENV PORT 8080

CMD [ "node","dist/main" ]