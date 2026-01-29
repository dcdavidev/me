import path from 'node:path';

import express, {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
  Router,
} from 'express';

interface ClientRouterOptions {
  clientPath: string;
  isSPA?: boolean;
  ssrHandler?: RequestHandler;
  noIndex?: boolean;
}

/**
 * Creates a standard router for a React Router client (Web or Admin).
 *
 * @param options - The configuration options for the client router.
 * @param options.clientPath - The absolute path to the client distribution folder.
 * @param options.isSPA - Whether to serve the app as a Single Page Application (index.html fallback).
 * @param options.ssrHandler - The React Router SSR request handler.
 * @param options.noIndex - Whether to add 'noindex' headers to all routes.
 * @returns The configured Express router.
 */
export function createClientRouter({
  clientPath,
  isSPA = false,
  ssrHandler,
  noIndex = false,
}: ClientRouterOptions): Router {
  const router = Router({ mergeParams: true });
  const staticPath = path.join(clientPath, 'client');

  // Security Headers
  if (noIndex) {
    router.use((_req: Request, res: Response, next: NextFunction) => {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      next();
    });
  }

  // Immutables Assets (/assets)
  router.use(
    '/assets',
    express.static(path.join(staticPath, 'assets'), {
      immutable: true,
      maxAge: '1y',
    })
  );

  // Generic Static Files (favicon, manifest, etc.)
  router.use(
    express.static(staticPath, {
      maxAge: '1h',
    })
  );

  // Client Handler (SPA Fallback or SSR)
  if (isSPA) {
    router.all('*splat', (_req: Request, res: Response) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } else if (ssrHandler) {
    router.all('*splat', ssrHandler);
  }

  return router;
}
