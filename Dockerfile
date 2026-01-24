FROM node:24.11.1-alpine3.23 AS base

RUN apk add --no-cache vips-dev build-base gcc autoconf automake zlib-dev libpng-dev nasm bash libc6-compat rsync

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /opt/me

FROM base AS builder

COPY . .

RUN find . -name "dist" -type d -exec rm -rf {} +
RUN find . -name ".turbo" -type d -exec rm -rf {} +

ENV CI=true

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN NODE_ENV=production pnpm dlx turbo run build --no-cache -- --mode production
RUN pnpm prune --prod --ignore-scripts

FROM node:24.11.1-alpine3.23 AS runner

RUN apk add --no-cache vips-dev bash

WORKDIR /opt/me

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

COPY --from=builder --chown=node:node /opt/me ./

USER node

EXPOSE $PORT

CMD [ "node", "apps/server/dist/main.js" ]
