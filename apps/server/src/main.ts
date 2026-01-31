import path from 'node:path';
import { pathToFileURL } from 'node:url';

import express from 'express';

import { Wnodex } from 'wnodex';
import { createRequestHandler } from '@react-router/express';

import { apiRouter, rootRouter } from '@repo/server-routes';
import { HOST, PORT, PROD } from '@repo/server-schemas';
import { initCronJobs } from '@repo/server-services';

const wnodex = new Wnodex({
  port: PORT,
  compression: true,
  bodyParsers: {
    json: { limit: '200mb' },
    urlencoded: { limit: '200mb', extended: true },
  },
  helmet: false,
  cors: {
    origin: [
      PROD ? HOST : `http://localhost:${PORT}`,
      'http://localhost:4000', // web dev server
      'http://localhost:4100', // admin dev server
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'X-Custom-Header',
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
});

// Getters
// const logger = wnodex.getLogger();
const app = wnodex.getApp();

app.set('trust proxy', 1);
app.disable('x-powered-by');

// --- PATHS ---
const CLIENT_PATH = path.join(import.meta.dirname, 'web');

// --- SSR HANDLER ---
const reactRouterHandler = createRequestHandler({
  build: await import(
    pathToFileURL(path.join(CLIENT_PATH, 'server', 'index.js')).href
  ),
});

app.use(
  '/assets',
  express.static(path.join(CLIENT_PATH, 'client', 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
);

// Client filles
app.use(
  express.static(path.join(CLIENT_PATH, 'client'), {
    maxAge: '1h',
  })
);

// --- ROUTES ---
app.use('/api', apiRouter);
app.use('/', rootRouter);
app.all('*splat', reactRouterHandler);

// --- STARTUP ---
await wnodex.start().then(() => {
  initCronJobs();
});

// Shutdown chores
const shutdown = async () => {
  await wnodex.shutdown(() => {
    // DB disconnection or other chores
  });
};

// Graceful shutdown on SIGINT/SIGTERM using Wnodex public method
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
