import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  // Production: use the list generated at build time and embedded as a server asset
  const storage = useStorage('assets:server-data')
  const list = await storage.getItem('portraits.json') as string[] | null

  if (list && list.length > 0) {
    return list
  }

  // Dev fallback: read directly from filesystem
  const dir = resolve('public/portraits')
  const files = await readdir(dir)
  return files
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
})
