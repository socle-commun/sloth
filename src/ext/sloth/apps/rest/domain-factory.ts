import { z, ZodObject, ZodType } from 'npm:zod';
import { RouteConfig } from 'npm:@hono/zod-openapi'
import createRoute from './create-route.ts'
import { Context } from 'https://deno.land/x/hono@v4.3.7/context.ts'

export class Domain {
    name: string;
    path: string;
    routes: Route[] = [];

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }

    addRoute(method: 'get' | 'post' | 'put' | 'delete', path: string, handler: (c: Context) => unknown) {
        const route = new Route(method, path, handler, [{name: this.name}], this);
        this.routes.push(route);
        return route;
    }
}

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
    bodySchema?: ZodType;

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

    addBody(schema: ZodType) {
        this.bodySchema = schema;
        return this;
    }
}
