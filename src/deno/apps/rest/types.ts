/**
 * $AppRestOptions
 * 
 * 🌐 Configuration options for initializing the REST application.
 * 
 * This type defines the customizable settings passed to the `$AppRest` function,
 * allowing you to adjust the REST API’s name, documentation paths, environment defaults,
 * and the HTML factory used to render the Swagger UI.
 * 
 * Fields:
 * - `appName`: Name of the application (used in logs and documentation titles).
 * - `docPath`: The REST endpoint path serving the OpenAPI JSON documentation.
 * - `uiPath`: The REST endpoint path serving the Swagger UI web interface.
 * - `appUrl`: Base URL of the application (used for CORS, links, etc.).
 * - `defaultEnv`: Default environment (e.g., 'production', 'development').
 * - `uiHtmlFactory`: A function that generates the HTML content for the Swagger UI page,
 *    using the selected theme and metadata like the doc path, app name, and version.
 * 
 * 🔔 Note: Providing customized `uiHtmlFactory` allows full control over
 * the look and feel of the documentation frontend.
 */
export type $AppRestOptions = {
    appName: string;
    docPath: string;
    uiPath: string;
    appUrl: string;
    defaultEnv: string;
    uiHtmlFactory: (themeContent: string, docPath: string, appName: string, version: string) => string;
}