import { Router } from 'express';

import { contactMe } from '@repo/server-controllers';

export const apiRouter: Router = Router({ mergeParams: true });

apiRouter.post('/contact-me', contactMe);
