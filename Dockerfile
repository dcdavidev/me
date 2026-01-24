FROM node:24.11.1-alpine3.23 AS runner

RUN apk add --no-cache vips-dev bash

WORKDIR /opt/me

ENV NODE_ENV=production

COPY --chown=node:node /apps/server/dist ./

USER node

EXPOSE $PORT

CMD [ "node", "main.js" ]
