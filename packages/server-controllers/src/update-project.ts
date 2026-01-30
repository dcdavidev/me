import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';
import { cloudinary } from '@repo/server-services';

/**
 * Updates an existing project and manages image replacements on Cloudinary.
 * @param req - Express request.
 * @param res - Express response.
 * @param next - Next function.
 */
export async function updateProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const {
      name,
      slug,
      homepageUrl,
      repoUrl,
      logo, // New image (optional)
      banner, // New image (optional)
      translations,
    } = req.body;

    const currentProject = await prisma.project.findUnique({ where: { id } });
    if (!currentProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    let logoUrl = currentProject.logoUrl;
    let bannerUrl = currentProject.bannerUrl;

    // Handle Logo Update
    if (logo && typeof logo === 'string') {
      const upload = await cloudinary.uploader.upload(logo, {
        folder: 'projects/logos',
        public_id: `${slug}_logo`,
        overwrite: true,
      });
      logoUrl = upload.secure_url;
    }

    // Handle Banner Update
    if (banner && typeof banner === 'string') {
      const upload = await cloudinary.uploader.upload(banner, {
        folder: 'projects/banners',
        public_id: `${slug}_banner`,
        overwrite: true,
      });
      bannerUrl = upload.secure_url;
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        slug,
        homepageUrl,
        repoUrl,
        logoUrl,
        bannerUrl,
        translations: {
          deleteMany: {}, // Simplest way to update translations
          create: translations,
        },
      },
      include: {
        translations: true,
      },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
}
