import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';

/**
 * Retrieves a single project by slug with all its translations.
 * @param req - Express request with slug param.
 * @param res - Express response.
 * @param next - Express next function.
 * @returns
 */
export async function getProjectBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { slug } = req.params;

    if (typeof slug !== 'string') {
      res.status(400).json({ error: 'Invalid project slug' });
      return;
    }

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        translations: true,
      },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(`[GetProjectBySlug Error] Slug: ${req.params.slug} -`, error);
    next(error);
  }
}
