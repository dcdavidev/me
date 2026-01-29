import { Router } from 'express';

import {
  checkSession,
  contactMe,
  logout,
  requestOtp,
  verifyOtp,
} from '@repo/server-controllers';

export const apiRouter: Router = Router({ mergeParams: true });

apiRouter.post('/contact-me', contactMe);

// Auth
apiRouter.post('/login', requestOtp);
apiRouter.post('/login', logout);
apiRouter.post('/verify', verifyOtp);
apiRouter.get('/me', checkSession);
