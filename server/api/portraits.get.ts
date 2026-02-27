import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  const dir = resolve('public/portraits')
  const files = await readdir(dir)
  return files
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
})
