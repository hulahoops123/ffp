// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"

// Reads pixel dimensions from an image file header (webp/png/jpeg/gif) so the gallery can
// reserve each tile's space at build time instead of downloading every image first
function imageSize(buf: Buffer): { width: number, height: number } | null {
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (chunk === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 }
  }
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  if (buf.toString('ascii', 0, 3) === 'GIF') return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i < buf.length) {
      const marker = buf[i + 1]
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) }
      i += 2 + buf.readUInt16BE(i + 2)
    }
  }
  return null
}

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
      const { readdir, readFile, writeFile } = await import('node:fs/promises')
      const { resolve } = await import('node:path')
      const files = await readdir(resolve('./public/portraits'))
      const filenames = files
        .filter((f: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
        .sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      const list = await Promise.all(filenames.map(async (file: string) => {
        const size = imageSize(await readFile(resolve('./public/portraits', file)))
        if (!size) console.warn(`Could not read dimensions of portrait ${file}`)
        return { file, width: size?.width ?? 1000, height: size?.height ?? 1000 }
      }))
      const json = JSON.stringify(list)
      await writeFile(resolve('./public/portraits-list.json'), json)
      await writeFile(resolve('./server/portraits-data.json'), json)
      console.log(`Generated portraits data with ${list.length} portraits`)
    }
  },

  compatibilityDate: '2025-03-06',
})