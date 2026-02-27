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
      const { readdir, writeFile, mkdir } = await import('node:fs/promises')
      const { resolve } = await import('node:path')
      const dataDir = resolve('./server-data')
      await mkdir(dataDir, { recursive: true })
      const files = await readdir(resolve('./public/portraits'))
      const list = files
        .filter((f: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
        .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      await writeFile(resolve(dataDir, 'portraits.json'), JSON.stringify(list))
      console.log(`Generated portraits.json with ${list.length} portraits`)
    }
  },

  nitro: {
    serverAssets: [{
      baseName: 'server-data',
      dir: './server-data'
    }]
  },

  compatibilityDate: '2025-03-06',
})