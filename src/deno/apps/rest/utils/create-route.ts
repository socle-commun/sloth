import { z } from 'zod';
import { createRoute, RouteConfig } from '@hono/zod-openapi';
import { deepMerge } from '../../../../utils/deep-merge.ts'

const ErrorResponseSchema = z.object({
    error: z.string().describe('Error code identifier'),
    message: z.string().describe('Human-readable description of the error'),
});

const defaultRouteOpts: Partial<RouteConfig> = {
    method: 'get',
    responses: {
        429: {
            description: 'Too many requests — rate limited',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        401: {
            description: 'Unauthorized — authentication required',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        403: {
            description: 'Forbidden — access denied',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        500: {
            description: 'Internal server error',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
        503: {
            description: 'Service unavailable — one or more dependencies are down',
            content: {
                'application/json': {
                    schema: ErrorResponseSchema,
                },
            },
        },
    }
}

/**
 * createRoute
 * 
 * 🏗️ Utility to wrap and enrich route configuration with default error responses.
 * 
 * Features:
 * - Merges provided route configuration with standard 401, 403, 429, 500, 503 responses.
 * - Uses `deepMerge` to ensure safe combination of nested configs.
 * - Produces final object usable by Hono OpenAPI plugin.
 * 
 */
export default (routeOpts: RouteConfig) => {
    // Deep merge routeOpts with default options
    return createRoute(deepMerge<RouteConfig>(defaultRouteOpts as RouteConfig, routeOpts));
}