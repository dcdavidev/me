import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';
import { cloudinary } from '@repo/server-services';

/**
 * Deletes a project and its associated Cloudinary assets.
 * @param req - Express request.
 * @param res - Express response.
 * @param next - Next function.
 * @returns
 */
export async function deleteProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    // Type Guard to satisfy Prisma's String filter
    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const deleteAsset = async (url: string | null) => {
      if (!url) return;
      // Extracts publicId from URL (folder/name)
      const publicId = url.split('/').slice(-2).join('/').split('.')[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
    };

    await Promise.all([
      deleteAsset(project.logoUrl),
      deleteAsset(project.bannerUrl),
    ]);

    await prisma.project.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
