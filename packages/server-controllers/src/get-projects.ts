import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';

/**
 * Retrieves the list of all projects with their translations.
 * @param _req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns
 */
export async function getProjects(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projects = await prisma.project.findMany({
      include: {
        translations: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('[GetProjects Error]:', error);
    next(error);
  }
}
