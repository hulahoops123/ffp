import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  // In production, serverAssets bundles the file list at build time
  const storage = useStorage('assets:portraits')
  const keys = await storage.getKeys()

  if (keys.length > 0) {
    return keys
      .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  }

  // Fallback for dev mode: read directly from filesystem
  const dir = resolve('public/portraits')
  const files = await readdir(dir)
  return files
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
})
