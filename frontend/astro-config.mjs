// astro.config.mjs
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'

export default defineConfig({
  site: 'https://harrysibbenga-dev.vercel.app',
  
  integrations: [
    vue({
      appEntrypoint: '/src/vue-app.ts'
    }),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000
    }),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ],

  vite: {
    optimizeDeps: {
      include: ['lucide-vue-next']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'lucide-vue-next'],
            utils: ['./src/utils/constants.ts', './src/utils/projects.ts']
          }
        }
      }
    }
  },

  image: {
    domains: ['localhost', 'harrysibbenga-dev.vercel.app'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.vercel.app'
    }]
  },

  experimental: {
    viewTransitions: true
  },

  output: 'static',
  
  compressHTML: true,
  
  build: {
    inlineStylesheets: 'auto'
  }
})