import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';

/**
 * Retrieves all projects with translations for a specific language.
 * @param req - Express request with lang query param.
 * @param res - Express response.
 * @param next - Express next function.
 */
export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const lang = typeof req.query.lang === 'string' ? req.query.lang : 'en';

    const projects = await prisma.project.findMany({
      include: {
        translations: {
          where: { language: lang },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
}
