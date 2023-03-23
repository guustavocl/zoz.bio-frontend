FROM node:18-alpine AS alpine

FROM alpine AS deps
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile;

# Rebuild the source code only when needed
FROM alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files
FROM nginx:alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/dist /usr/share/nginx/html

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vite
RUN chown -R vite:nodejs /app/build
USER vite
EXPOSE 3000

# create image with this command: sudo docker build . -t zoz.gg-image
# run container with this command: sudo docker run -d --name zoz.gg --network npm zoz.gg-image