import { prisma } from '@repo/server-models';

/**
 * Fetches a project by slug with its specific translation.
 * @param slug - The project slug.
 * @param lang - The desired language code.
 */
export async function getProjectBySlug(slug: string, lang: string) {
  return await prisma.project.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { language: lang },
        take: 1,
      },
    },
  });
}
