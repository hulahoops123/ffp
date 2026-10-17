// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
export default defineNuxtConfig({
  devtools: { enabled: false },

  devServer: {
    port: 4000,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/sitemap', // ← add this line
  ],
  css: ['~/assets/css/fonts.css'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=4' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=4' },
        { rel: 'preload', href: '/fonts/moon-dance-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/clicker-script-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
      ],
    },
  },
  // @ts-ignore: Nuxt does not type sitemap config by default
  sitemap: {
    siteUrl: 'https://faithfulfriendportraits.co.za',
  },

  hooks: {
    async 'build:before'() {
      const { readdir, writeFile } = await import('node:fs/promises')
      const { resolve } = await import('node:path')
      const files = await readdir(resolve('./public/portraits'))
      const list = files
        .filter((f: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
        .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      const json = JSON.stringify(list)
      await writeFile(resolve('./public/portraits-list.json'), json)
      await writeFile(resolve('./server/portraits-data.json'), json)
      console.log(`Generated portraits data with ${list.length} portraits`)
    }
  },

  compatibilityDate: '2025-03-06',
})