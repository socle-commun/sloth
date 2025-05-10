import { ZodObject, ZodType } from 'zod';
import { Context } from 'hono';
import { RouteConfig } from '@hono/zod-openapi'
import type { Domain } from './domain.class.ts'
import createRoute from './utils/create-route.ts'

/**
 * Route
 * 
 * 📦 Represents a single API route (endpoint) with HTTP method, path, handler, 
 * schemas (params, query, body), and OpenAPI metadata.
 * 
 * Features:
 * - Supports Zod schemas for validation.
 * - Allows adding custom responses and descriptions.
 * - Generates an OpenAPI-compatible schema using `schema` getter.
 * 
 * Example:
 * const route = domain.addRoute('post', '/login', handler)
 *     .addBody(loginSchema)
 *     .addResponse(200, successSchema)
 * 
 */
export class Route {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: (c: Context) => unknown;
    tags: { name: string, description?: string }[];
    // deno-lint-ignore no-explicit-any
    responses: Record<number, any> = {};

    // deno-lint-ignore no-explicit-any
    paramsSchema?: ZodObject<any>;
    // deno-lint-ignore no-explicit-any
    querySchema?: ZodObject<any>;
    // deno-lint-ignore no-explicit-any
    bodySchema?: ZodObject<any>;

    constructor(
        method: 'get' | 'post' | 'put' | 'delete',
        path: string,
        handler: (c: Context) => unknown,
        tags: { name: string, description?: string }[],
        public domain: Domain
    ) {
        this.method = method;
        this.path = path;
        this.handler = handler;
        this.tags = tags;
    }

    get schema(): RouteConfig {
        const baseSchema: RouteConfig = {
            method: this.method,
            path: this.path,
            tags: this.tags.map((t) => t.name),
            responses: this.responses,
        };

        if (this.paramsSchema || this.querySchema || this.bodySchema) {
            baseSchema.request = {};

            if (this.paramsSchema) {
                baseSchema.request.params = this.paramsSchema;
            }

            if (this.querySchema) {
                baseSchema.request.query = this.querySchema;
            }

            if (this.bodySchema) {
                baseSchema.request.body = {
                    content: {
                        'application/json': {
                            schema: this.bodySchema,
                        },
                    },
                };
            }
        }

        return createRoute(baseSchema);
    }

    addResponse(status: number, schema: ZodType, description = `Response ${status}`) {
        this.responses[status] = {
            description,
            content: {
                'application/json': { schema },
            },
        };
        return this;
    }

    // deno-lint-ignore no-explicit-any
    addParams(schema: ZodObject<any>) {
        this.paramsSchema = schema;
        return this;
    }

    // deno-lint-ignore no-explicit-any
    addQuery(schema: ZodObject<any>) {
        this.querySchema = schema;
        return this;
    }

    // deno-lint-ignore no-explicit-any
    addBody(schema: ZodObject<any>) {
        this.bodySchema = schema;
        return this;
    }
}