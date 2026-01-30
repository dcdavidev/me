import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';
import { cloudinary } from '@repo/server-services';

/**
 * Creates a new project with its translations and uploads images to Cloudinary.
 * @param req - Express request object containing project data and images.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 * @returns
 */
export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, slug, homepageUrl, repoUrl, logo, banner, translations } =
      req.body;

    let logoUrl: string | undefined;
    let bannerUrl: string | undefined;

    // Upload Logo
    if (logo) {
      const uploadedLogo = await cloudinary.uploader.upload(logo, {
        folder: 'projects/logos',
        public_id: `${slug}_logo`,
        overwrite: true,
      });
      logoUrl = uploadedLogo.secure_url;
    }

    // Upload Banner
    if (banner) {
      const uploadedBanner = await cloudinary.uploader.upload(banner, {
        folder: 'projects/banners',
        public_id: `${slug}_banner`,
        overwrite: true,
      });
      bannerUrl = uploadedBanner.secure_url;
    }

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        homepageUrl,
        repoUrl,
        logoUrl,
        bannerUrl,
        translations: {
          create: translations,
        },
      },
      include: {
        translations: true,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}
