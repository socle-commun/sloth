
export type $AppRestOptions = {
    appName: string;
    docPath: string;
    uiPath: string;
    appUrl: string;
    defaultEnv: string;
    uiHtmlFactory: (themeContent: string, docPath: string, appName: string, version: string) => string;
}