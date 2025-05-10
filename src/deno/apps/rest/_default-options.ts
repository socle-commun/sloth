import { $AppRestOptions } from './types.ts'
import { SwaggerUI } from '@hono/swagger-ui';

export const defaultOptions: $AppRestOptions = {
    appName: 'Unknown App',
    docPath: '/doc',
    uiPath: '/ui',
    appUrl: 'http://localhost:8000',
    defaultEnv: 'production',
    uiHtmlFactory: (themeContent: string, docPath: string, appName: string, version: string): string => {
        return `
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="${appName} API Doc" />
            <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDIwMCAyMDAiPgoJPGRlZnM+CgkJPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB4Mj0iNzUlIiB5MT0iMCUiIHkyPSI3NSUiPgoJCQk8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkYwMDY2Ij48L3N0b3A+CgkJCTxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0JEMzRGRSI+PC9zdG9wPgoJCTwvbGluZWFyR3JhZGllbnQ+Cgk8L2RlZnM+Cgk8cGF0aCBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwIDEwMCkiPgoJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImQiCgkJCXZhbHVlcz0iTTYwLjEsLTUwLjZDNzIuNywtMzIuMSw3NC4yLC03LjQsNjYsOS43QzU3LjksMjYuOCw0MCwzNi4zLDIzLDQyLjVDNiw0OC43LC0xMC4xLDUxLjUsLTI2LjEsNDYuNkMtNDIuMiw0MS44LC01OC4yLDI5LjQsLTYxLjUsMTQuMkMtNjQuOCwtMC45LC01NS40LC0xOC44LC00MywtMzcuM0MtMzAuNiwtNTUuOCwtMTUuMywtNzQuOSw0LjIsLTc4LjJDMjMuNywtODEuNiw0Ny40LC02OS4yLDYwLjEsLTUwLjZaOwogICAgICAgICAgICBNNTAuMiwtMzguN0M2My4xLC0yNCw3MCwtMy4yLDY3LjksMTkuMkM2NS43LDQxLjYsNTQuNCw2NS42LDM2LjMsNzMuOEMxOC4xLDgxLjksLTYuOSw3NC4yLC0yNyw2Mi4yQy00Ny4xLDUwLjIsLTYyLjIsMzMuOSwtNjUuNSwxNkMtNjguNywtMiwtNjAuMiwtMjEuNiwtNDcuNCwtMzYuNEMtMzQuNSwtNTEuMiwtMTcuMiwtNjEuMSwwLjcsLTYxLjdDMTguNywtNjIuMywzNy40LC01My41LDUwLjIsLTM4LjdaOwogICAgICAgICAgICBNNjUuOSwtNTAuNUM4MC43LC0zNC4xLDg0LjYsLTcsNzUuNSwxMUM2Ni40LDI5LDQ0LjQsMzcuNywyMyw0OC4yQzEuNiw1OC42LC0xOS4xLDcwLjcsLTMxLjIsNjQuOUMtNDMuNCw1OSwtNDYuOSwzNS4zLC00OSwxNC41Qy01MS4yLC02LjMsLTUxLjksLTI0LjIsLTQzLjUsLTM5LjFDLTM1LjEsLTU0LjEsLTE3LjYsLTY2LjEsNCwtNjkuM0MyNS42LC03Mi42LDUxLjIsLTY2LjksNjUuOSwtNTAuNVo7CiAgICAgICAgICAgIE01Mi4zLC00Mi4zQzYyLjEsLTI5LjQsNjAuNiwtOCw1Ni4xLDEzLjNDNTEuNywzNC42LDQ0LjQsNTUuOCwzMCw2Mi45QzE1LjcsNzAsLTUuNiw2MywtMjIuMSw1Mi41Qy0zOC42LDQyLC01MC4zLDI4LjEsLTU2LDEwLjZDLTYxLjgsLTYuOCwtNjEuNSwtMjcuOCwtNTEuMSwtNDAuOUMtNDAuOCwtNTQsLTIwLjQsLTU5LjEsMC40LC01OS41QzIxLjIsLTU5LjgsNDIuNSwtNTUuMyw1Mi4zLC00Mi4zWjsKICAgICAgICAgICAgTTYwLjEsLTUwLjZDNzIuNywtMzIuMSw3NC4yLC03LjQsNjYsOS43QzU3LjksMjYuOCw0MCwzNi4zLDIzLDQyLjVDNiw0OC43LC0xMC4xLDUxLjUsLTI2LjEsNDYuNkMtNDIuMiw0MS44LC01OC4yLDI5LjQsLTYxLjUsMTQuMkMtNjQuOCwtMC45LC01NS40LC0xOC44LC00MywtMzcuM0MtMzAuNiwtNTUuOCwtMTUuMywtNzQuOSw0LjIsLTc4LjJDMjMuNywtODEuNiw0Ny40LC02OS4yLDYwLjEsLTUwLjZaIgoJCQlkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+Cgk8L3BhdGg+Cjwvc3ZnPg==" />
            <title>🚀 ${appName} [${version}] API Docs</title>
            <script>
            </script>
            <style>
              ${themeContent}
              .scheme-container {
                background: #1c1c21 !important;
              }
              .opblock-tag small div.renderedMarkdown > p {
                  color: whitesmoke;
                  text-align: end;
                  font-weight: bold;
                  margin-right: 1%;
              }
              .opblock-tag small div.renderedMarkdown > p > em {
                  border-bottom: 1px solid white;
                  padding-bottom: 3px;
              }
              .swagger-ui .opblock .opblock-summary-path-description-wrapper {
                  justify-content: space-between;
              }
              span, .parameter__name, .response-col_status, .title
              {
                  color:rgb(191, 195, 202) !important;
              }
    
            </style>
          </head>
          <body>
            <div style="text-align:center; margin-top:20px;">
                <img width="200px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDIwMCAyMDAiPgoJPGRlZnM+CgkJPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB4Mj0iNzUlIiB5MT0iMCUiIHkyPSI3NSUiPgoJCQk8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkYwMDY2Ij48L3N0b3A+CgkJCTxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0JEMzRGRSI+PC9zdG9wPgoJCTwvbGluZWFyR3JhZGllbnQ+Cgk8L2RlZnM+Cgk8cGF0aCBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwIDEwMCkiPgoJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImQiCgkJCXZhbHVlcz0iTTYwLjEsLTUwLjZDNzIuNywtMzIuMSw3NC4yLC03LjQsNjYsOS43QzU3LjksMjYuOCw0MCwzNi4zLDIzLDQyLjVDNiw0OC43LC0xMC4xLDUxLjUsLTI2LjEsNDYuNkMtNDIuMiw0MS44LC01OC4yLDI5LjQsLTYxLjUsMTQuMkMtNjQuOCwtMC45LC01NS40LC0xOC44LC00MywtMzcuM0MtMzAuNiwtNTUuOCwtMTUuMywtNzQuOSw0LjIsLTc4LjJDMjMuNywtODEuNiw0Ny40LC02OS4yLDYwLjEsLTUwLjZaOwogICAgICAgICAgICBNNTAuMiwtMzguN0M2My4xLC0yNCw3MCwtMy4yLDY3LjksMTkuMkM2NS43LDQxLjYsNTQuNCw2NS42LDM2LjMsNzMuOEMxOC4xLDgxLjksLTYuOSw3NC4yLC0yNyw2Mi4yQy00Ny4xLDUwLjIsLTYyLjIsMzMuOSwtNjUuNSwxNkMtNjguNywtMiwtNjAuMiwtMjEuNiwtNDcuNCwtMzYuNEMtMzQuNSwtNTEuMiwtMTcuMiwtNjEuMSwwLjcsLTYxLjdDMTguNywtNjIuMywzNy40LC01My41LDUwLjIsLTM4LjdaOwogICAgICAgICAgICBNNjUuOSwtNTAuNUM4MC43LC0zNC4xLDg0LjYsLTcsNzUuNSwxMUM2Ni40LDI5LDQ0LjQsMzcuNywyMyw0OC4yQzEuNiw1OC42LC0xOS4xLDcwLjcsLTMxLjIsNjQuOUMtNDMuNCw1OSwtNDYuOSwzNS4zLC00OSwxNC41Qy01MS4yLC02LjMsLTUxLjksLTI0LjIsLTQzLjUsLTM5LjFDLTM1LjEsLTU0LjEsLTE3LjYsLTY2LjEsNCwtNjkuM0MyNS42LC03Mi42LDUxLjIsLTY2LjksNjUuOSwtNTAuNVo7CiAgICAgICAgICAgIE01Mi4zLC00Mi4zQzYyLjEsLTI5LjQsNjAuNiwtOCw1Ni4xLDEzLjNDNTEuNywzNC42LDQ0LjQsNTUuOCwzMCw2Mi45QzE1LjcsNzAsLTUuNiw2MywtMjIuMSw1Mi41Qy0zOC42LDQyLC01MC4zLDI4LjEsLTU2LDEwLjZDLTYxLjgsLTYuOCwtNjEuNSwtMjcuOCwtNTEuMSwtNDAuOUMtNDAuOCwtNTQsLTIwLjQsLTU5LjEsMC40LC01OS41QzIxLjIsLTU5LjgsNDIuNSwtNTUuMyw1Mi4zLC00Mi4zWjsKICAgICAgICAgICAgTTYwLjEsLTUwLjZDNzIuNywtMzIuMSw3NC4yLC03LjQsNjYsOS43QzU3LjksMjYuOCw0MCwzNi4zLDIzLDQyLjVDNiw0OC43LC0xMC4xLDUxLjUsLTI2LjEsNDYuNkMtNDIuMiw0MS44LC01OC4yLDI5LjQsLTYxLjUsMTQuMkMtNjQuOCwtMC45LC01NS40LC0xOC44LC00MywtMzcuM0MtMzAuNiwtNTUuOCwtMTUuMywtNzQuOSw0LjIsLTc4LjJDMjMuNywtODEuNiw0Ny40LC02OS4yLDYwLjEsLTUwLjZaIgoJCQlkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+Cgk8L3BhdGg+Cjwvc3ZnPg==" />
            </div>
            ${SwaggerUI({ url: docPath })}
        </body>
        </html>
      `
    }
}