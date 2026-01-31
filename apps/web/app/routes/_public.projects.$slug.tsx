import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { useLoaderData } from 'react-router';

import {
  Avatar,
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes';

import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

import { MarkdownComponents } from '@repo/web-components';
import { api } from '@repo/web-configs';

import type { Route } from './+types/_public.projects.$slug';

/**
 * Project translation interface.
 */
interface ProjectTranslation {
  language: string;
  shortDescription: string;
  body: string;
}

/**
 * Detailed project interface.
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

export function meta({ loaderData }: Route.MetaArgs) {
  const project = loaderData as Route.ComponentProps['loaderData'];
  return [{ title: `${project?.name || 'Project'} | Davide Di Criscito` }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await api.get(`/projects/${params.slug}`);
  return response.data as Project;
}

export default function ProjectDetailPage() {
  const { i18n } = useTranslation();
  const project = useLoaderData<typeof loader>();

  const translation =
    project.translations.find((t) => t.language === i18n.language) ||
    project.translations.find((t) => t.language === 'it') ||
    project.translations[0];

  const hasBanner = !!project.bannerUrl;

  return (
    <Box>
      {/* Hero Section: Shown only if banner exists */}
      {hasBanner && (
        <Box
          style={{
            height: '40vh',
            minHeight: '350px',
            backgroundColor: 'var(--gray-3)',
            backgroundImage: `url(${project.bannerUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Container size="3" px="4">
        <Flex direction="column" gap="5" my="8">
          {/* Header Section */}
          <Flex direction="column" gap="4">
            {/* Logo: Shown only if NO banner exists */}
            {!hasBanner && project.logoUrl && (
              <Avatar
                size="7"
                src={project.logoUrl}
                fallback={project.name[0]}
                radius="large"
                style={{ boxShadow: 'var(--shadow-3)' }}
              />
            )}

            <Box>
              <Heading size="9" mb="2">
                {project.name}
              </Heading>
              <Text size="5" color="gray" as="p">
                {translation?.shortDescription}
              </Text>
            </Box>

            {/* External Links List */}
            <Flex gap="3" wrap="wrap">
              {project.homepageUrl && (
                <Badge color="blue" size="3" variant="soft" asChild>
                  <a
                    href={project.homepageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconExternalLink size={16} style={{ marginRight: 6 }} />
                    Live Demo
                  </a>
                </Badge>
              )}
              {project.repoUrl && (
                <Badge color="gray" size="3" variant="soft" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    <IconBrandGithub size={16} style={{ marginRight: 6 }} />
                    Repository
                  </a>
                </Badge>
              )}
            </Flex>
          </Flex>

          <Box mt="4">
            <ReactMarkdown components={MarkdownComponents}>
              {translation?.body || ''}
            </ReactMarkdown>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
