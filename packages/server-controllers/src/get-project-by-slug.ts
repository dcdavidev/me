import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';

/**
 * Retrieves a single project by slug.
 * @param req - Express request with slug param and optional lang query.
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
    const slug = req.params.slug as string;
    const lang = (req.query.lang as string) || 'en';

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language: lang },
        },
      },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
}
