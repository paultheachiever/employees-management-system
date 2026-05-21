# ── Stage 1: Build ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . ./
RUN pnpm build

# ── Stage 2: Production ────────────────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/dist ./dist
EXPOSE 8000
CMD ["node", "dist/main"]