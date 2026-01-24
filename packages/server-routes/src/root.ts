import { Router } from 'express';

import { health } from '@repo/server-controllers';

export const rootRouter: Router = Router({ mergeParams: true });

rootRouter.get('/health', health);
