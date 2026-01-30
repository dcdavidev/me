import { Router } from 'express';

import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject,
} from '@repo/server-controllers';
import { authenticate } from '@repo/server-middlewares';

const projectsRouter: Router = Router();

/**
 * Public routes
 */
projectsRouter.get('/', getProjects);
projectsRouter.get('/:slug', getProjectBySlug);

/**
 * Admin routes (Protected)
 * Add your authentication middleware here, e.g., projectsRouter.use(authenticate);
 */
projectsRouter.post('/', authenticate, createProject);
projectsRouter.put('/:id', authenticate, updateProject);
projectsRouter.delete('/:id', authenticate, deleteProject);

export default projectsRouter;
