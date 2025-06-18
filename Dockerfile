FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY package.json package-lock.json* ./

RUN npm ci --omit=dev

COPY --chown=nextjs:nodejs .next ./.next
COPY --chown=nextjs:nodejs next.config.mjs .

RUN chmod +x /app/node_modules/.bin/next

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]