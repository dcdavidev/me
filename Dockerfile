FROM node:24.11.1-alpine3.23 AS runner

RUN apk add --no-cache vips-dev bash sudo curl

RUN curl -1sLf \
  'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' \
  | bash
RUN apk update && sudo apk add infisical

WORKDIR /opt/me

ENV NODE_ENV=production

COPY --chown=node:node /apps/server/dist ./
COPY --chown=node:node /apps/web/dist ./web
COPY --chown=node:node entrypoint.sh ./

RUN chmod +x entrypoint.sh
RUN npm install --omit=dev --no-audit --no-fund

USER node

EXPOSE $PORT

ENTRYPOINT ["./entrypoint.sh"]
CMD [ "node", "main.js" ]
