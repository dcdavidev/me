import { type NextFunction, type Request, type Response } from 'express';

import { prisma } from '@repo/server-models';
import { cloudinary } from '@repo/server-services';

/**
 * Creates a new project with its translations and uploads images to Cloudinary.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export async function createProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, slug, homepageUrl, repoUrl, logo, banner, translations } =
      req.body;

    // DEBUG
    console.log(`[CreateProject] Processing slug: ${slug}`);
    console.log(`[CreateProject] Logo size: ${logo ? logo.length : 0} chars`);

    let logoUrl: string | undefined;
    let bannerUrl: string | undefined;

    // Upload Images to Cloudinary
    try {
      if (logo && typeof logo === 'string' && logo.startsWith('data:image')) {
        const uploadedLogo = await cloudinary.uploader.upload(logo, {
          folder: 'me/projects/logos',
          public_id: `${slug}_logo`,
          overwrite: true,
        });
        logoUrl = uploadedLogo.secure_url;
      }

      if (
        banner &&
        typeof banner === 'string' &&
        banner.startsWith('data:image')
      ) {
        const uploadedBanner = await cloudinary.uploader.upload(banner, {
          folder: 'me/projects/banners',
          public_id: `${slug}_banner`,
          overwrite: true,
        });
        bannerUrl = uploadedBanner.secure_url;
      }
    } catch (uploadError) {
      console.error('[Cloudinary Upload Error]:', uploadError);
      res
        .status(400)
        .json({ error: "Errore durante l'upload delle immagini." });
      return;
    }

    // Save to Database
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        homepageUrl: homepageUrl || null,
        repoUrl: repoUrl || null,
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

    console.log(`[CreateProject] Project created successfully: ${project.id}`);
    res.status(201).json(project);
  } catch (error) {
    console.error('[CreateProject Database Error]:', error);
    next(error);
  }
}
