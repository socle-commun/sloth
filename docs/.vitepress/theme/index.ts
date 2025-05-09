//☄️todo: Relier au thème global de socle-commun
import type { Theme } from 'npm:vitepress'

import { Layout } from './components/index.ts'

import './style.css'

export default {
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme