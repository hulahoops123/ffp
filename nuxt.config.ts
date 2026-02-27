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
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap', // ← add this line
  ],
  // @ts-ignore: googleFonts module options are not typed by default.
  googleFonts: {
    display: "fallback",
    families: {
      'Clicker Script': true,
      'Moon Dance': true,
    }
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
      await writeFile(resolve('./public/portraits-list.json'), JSON.stringify(list))
      console.log(`Generated portraits-list.json with ${list.length} portraits`)
    }
  },

  compatibilityDate: '2025-03-06',
})