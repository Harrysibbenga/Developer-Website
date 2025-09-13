import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'

export default defineConfig({
  site: 'https://harrysibbenga-dev.vercel.app',

  output: 'static', 

  integrations: [
    vue(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
})
