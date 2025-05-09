//☄️todo: Relier au thème global de socle-commun

import { defineConfig } from 'npm:vitepress'

export default defineConfig({
  title: 'Example Deno Server',
  description: 'Documentation du projet Example Deno Server',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:ital,wght@0,200..800;1,200..800&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Sarina&display=swap', rel: 'stylesheet' }
    ]
  ],
  themeConfig: {
    logo: {
      light: "/logo-light.svg",
      dark: "/logo-dark.svg"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/socle-commun" }
    ],
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Features', link: '/features/' }
    ],
    sidebar: {
      '/features/': [
        { text: 'Introduction', link: '/features/' },
        { text: 'Security', link: '/features/security' },
        { text: 'OpenAPI', link: '/features/openapi' },
        { text: 'Documentation', link: '/features/documentation' },
        { text: 'Env', link: '/features/env' },
        { text: 'Github Workflows', link: '/features/workflows' },
      ]
    }
  }
})
