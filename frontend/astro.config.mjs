import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://harrysibbenga-dev.vercel.app',

  output: 'server',

  integrations: [
    vercel(),
    vue(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
})
