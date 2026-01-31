import { NavLink, useLoaderData } from 'react-router';

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Table,
  Text,
} from '@radix-ui/themes';

import { IconEdit, IconPlus, IconWorld } from '@tabler/icons-react';

import { parse } from 'cookie';

import { api } from '@repo/web-configs';

import type { Route } from './+types/dashboard.projects.js';

/**
 * Project translation interface.
 */
interface Translation {
  id: string;
  language: string;
}

/**
 * Project data interface.
 */
interface Project {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  homepageUrl?: string;
  createdAt: string;
  translations: Translation[];
}

export function meta() {
  /* cspell:disable-next-line */
  return [{ title: 'Gestione Progetti | Davide Di Criscito' }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookies = parse(cookieHeader || '');
  const token = cookies.auth_token;

  const response = await api.post('/projects', { token });
  return response.data as Project[];
}

export default function ProjectsPage() {
  const projects = useLoaderData<typeof loader>();

  return (
    <Box>
      <Flex justify="between" align="center" mb="5">
        <Box>
          {/* cspell:disable-next-line */}
          <Heading size="8">Progetti</Heading>
          <Text color="gray" size="2">
            {/* cspell:disable-next-line */}
            Gestisci i progetti visualizzati nel portfolio.
          </Text>
        </Box>
        <Button asChild>
          <NavLink to="/dashboard/projects/new">
            {/* cspell:disable-next-line */}
            <IconPlus size={18} /> Nuovo Progetto
          </NavLink>
        </Button>
      </Flex>

      <Card size="2">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Slug</Table.ColumnHeaderCell>
              {/* cspell:disable-next-line */}
              <Table.ColumnHeaderCell>Lingue</Table.ColumnHeaderCell>
              {/* cspell:disable-next-line */}
              <Table.ColumnHeaderCell>Creato il</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify="end">
                {/* cspell:disable-next-line */}
                Azioni
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {projects.length === 0 ? (
              <Table.Row>
                <Table.RowHeaderCell
                  colSpan={5}
                  style={{ textAlign: 'center', padding: '32px' }}
                >
                  {/* cspell:disable-next-line */}
                  <Text color="gray">Nessun progetto trovato.</Text>
                </Table.RowHeaderCell>
              </Table.Row>
            ) : (
              projects.map((project: Project) => (
                <Table.Row key={project.id} align="center">
                  <Table.RowHeaderCell>
                    <Flex align="center" gap="3">
                      {project.logoUrl && (
                        <img
                          src={project.logoUrl}
                          alt={project.name}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 4,
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <Text weight="bold">{project.name}</Text>
                    </Flex>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Badge variant="soft" color="gray">
                      {project.slug}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap="1">
                      {project.translations?.map((t: Translation) => (
                        <Badge
                          key={t.id}
                          color="blue"
                          variant="surface"
                          size="1"
                        >
                          {t.language.toUpperCase()}
                        </Badge>
                      ))}
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(project.createdAt).toLocaleDateString('it-IT')}
                  </Table.Cell>
                  <Table.Cell justify="end">
                    <Flex gap="2" justify="end">
                      {project.homepageUrl && (
                        <IconButton
                          variant="ghost"
                          color="gray"
                          onClick={() =>
                            window.open(project.homepageUrl, '_blank')
                          }
                        >
                          <IconWorld size={18} />
                        </IconButton>
                      )}
                      <IconButton variant="soft" asChild>
                        <NavLink to={`/dashboard/projects/${project.id}`}>
                          <IconEdit size={18} />
                        </NavLink>
                      </IconButton>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Card>
    </Box>
  );
}
