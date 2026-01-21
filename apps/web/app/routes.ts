import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

/**
 * Route configuration using Flat Routes convention.
 * The framework will look into the 'routes' directory.
 */
export default flatRoutes() satisfies RouteConfig;
