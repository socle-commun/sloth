import { Context } from 'https://deno.land/x/hono@v4.3.7/context.ts'
import { Route } from './route.class.ts'

/**
 * Domain
 * 
 * 📦 Represents a REST API domain grouping related routes under a common namespace.
 * 
 * Features:
 * - Holds a name and base path.
 * - Stores a list of Route instances.
 * - Provides `addRoute()` to easily add new endpoints.
 * 
 * Example:
 * const userDomain = new Domain('users', '/users')
 * userDomain.addRoute('get', '/profile', handler)
 * 
 */
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
