FROM node:18-alpine AS alpine

FROM alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile;

# Rebuild the source code only when needed
FROM alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env.production.local ./.env.production.local
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app/.next
USER nextjs
EXPOSE 3000
CMD ["yarn", "start"]

# create image with this command: sudo docker build . -t zoz.bio-image
# run container with this command: sudo docker run -d --name zoz.bio --network npm zoz.bio-image