import { useTranslation } from 'react-i18next';

import { NavLink, useLoaderData } from 'react-router';

import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Inset,
  Section,
  Text,
} from '@radix-ui/themes';

import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

import { api } from '@repo/web-configs';

/**
 * Project translation interface for public view.
 */
interface ProjectTranslation {
  language: string;
  shortDescription: string;
}

/**
 * Project interface for public view.
 */
interface Project {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  bannerUrl?: string;
  homepageUrl?: string;
  repoUrl?: string;
  translations: ProjectTranslation[];
}

export function meta() {
  return [{ title: 'Projects | Davide Di Criscito' }];
}

export async function loader() {
  try {
    const response = await api.post('/projects');
    return Array.isArray(response.data) ? (response.data as Project[]) : [];
  } catch (error) {
    console.error('[Projects Loader] Error fetching projects:', error);
    return [] as Project[];
  }
}

export default function PublicProjectsPage() {
  const { t, i18n } = useTranslation();
  const data = useLoaderData<typeof loader>();

  const projects = Array.isArray(data) ? data : [];

  return (
    <Section>
      <Container size="3" px="4">
        <Box my="8">
          <Heading size="9" mb="4">
            {t('projects.title')}
          </Heading>
          <Text size="4" color="gray">
            {t('projects.subtitle')}
          </Text>
        </Box>

        {projects.length === 0 ? (
          <Flex align="center" justify="center" py="9">
            <Text color="gray" size="3">
              {t('projects.empty', 'No projects available at the moment.')}
            </Text>
          </Flex>
        ) : (
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="6">
            {projects.map((project: Project) => {
              const translation =
                project.translations.find(
                  (tr) => tr.language === i18n.language
                ) ||
                project.translations.find((tr) => tr.language === 'it') ||
                project.translations[0];

              return (
                <Card key={project.id} size="2" asChild>
                  {/* Wrap card content in NavLink for navigation to detail page */}
                  <NavLink
                    to={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Inset clip="padding-box" side="top" pb="current">
                      <Box
                        style={{
                          height: 160,
                          backgroundColor: 'var(--gray-3)',
                          backgroundImage: project.bannerUrl
                            ? `url(${project.bannerUrl})`
                            : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </Inset>

                    <Flex direction="column" gap="3" p="1">
                      <Flex align="center" gap="3">
                        {project.logoUrl && (
                          <img
                            src={project.logoUrl}
                            alt=""
                            style={{ width: 32, height: 32, borderRadius: 6 }}
                          />
                        )}
                        <Heading size="4">{project.name}</Heading>
                      </Flex>

                      <Text size="2" color="gray" truncate>
                        {translation?.shortDescription}
                      </Text>

                      <Flex gap="2" mt="2">
                        {project.homepageUrl && (
                          <Badge
                            color="blue"
                            variant="soft"
                            onClick={(e) => e.stopPropagation()} // Prevent card navigation
                            asChild
                          >
                            <a
                              href={project.homepageUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconExternalLink
                                size={14}
                                style={{ marginRight: 4 }}
                              />{' '}
                              Live
                            </a>
                          </Badge>
                        )}
                        {project.repoUrl && (
                          <Badge
                            color="gray"
                            variant="soft"
                            onClick={(e) => e.stopPropagation()} // Prevent card navigation
                            asChild
                          >
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconBrandGithub
                                size={14}
                                style={{ marginRight: 4 }}
                              />{' '}
                              Repo
                            </a>
                          </Badge>
                        )}
                      </Flex>
                    </Flex>
                  </NavLink>
                </Card>
              );
            })}
          </Grid>
        )}
      </Container>
    </Section>
  );
}
