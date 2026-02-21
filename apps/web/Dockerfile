# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy pnpm workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy web app files
COPY apps/web ./apps/web

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the app
WORKDIR /app/apps/web
RUN pnpm build

# Runtime stage
FROM node:22-alpine
WORKDIR /app

# Install pnpm in runtime image
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:5084

EXPOSE 3000

# Copy built application and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY pnpm-workspace.yaml ./
COPY package.json ./

WORKDIR /app/apps/web
CMD ["pnpm", "start"]
