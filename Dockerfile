FROM node:20-alpine AS builder


WORKDIR /app

COPY package.json package-lock.json\* ./

RUN npm ci

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}


COPY . .


RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node\_modules ./node\_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder --chown=nextjs:nodejs /app ./
COPY --from=builder /app ./

USER nextjs


EXPOSE 3000

CMD ["npm", "start"]