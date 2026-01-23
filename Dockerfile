FROM node:24.11.1-alpine3.23 AS base

RUN apk add --no-cache vips-dev build-base gcc autoconf automake zlib-dev libpng-dev nasm bash libc6-compat rsync

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /opt/me

FROM base AS dependencies

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY . ./

ENV CI=true
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build

COPY --from=dependencies /opt/me/node_modules ./node_modules
COPY . .

ENV CI=true

RUN pnpm add turbo --global
RUN turbo run build

RUN pnpm prune --prod --no-optional

FROM node:24.11.1-alpine3.23 AS runner

RUN apk add --no-cache vips-dev

WORKDIR /opt/me

COPY --from=build --chown=node:node /opt/me/package.json /opt/me/pnpm-workspace.yaml ./
COPY --from=build --chown=node:node /opt/me/apps/server/package.json ./apps/server/
COPY --from=build --chown=node:node /opt/me/node_modules ./node_modules
COPY --from=build --chown=node:node /opt/me/apps/server/dist ./
COPY --from=build --chown=node:node /opt/me/apps/web/dist ./web

USER node

EXPOSE $PORT

CMD [ "node", "main.js" ]
