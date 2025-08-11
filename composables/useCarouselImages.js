export const useCarouselImages = async () => {
  const modules = import.meta.glob('/assets/carousel_images/*.{jpg,jpeg,png,gif,webp}', { eager: true })

  // Build array with filename, path, and URL (no TS types)
  const files = Object.entries(modules).map(([path, mod]) => {
    const filename = (path.split('/').pop() || '').replace(/\.[^/.]+$/, '')

    // Filename -> nice phrase
    const readable = filename
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .trim()

    // Capitalize words but keep “dog/cat” lower for sentence flow
    const capitalized = readable.replace(/\b\w/g, c => c.toUpperCase())
    const speciesFixed = capitalized
      .replace(/\bDog\b/g, 'dog')
      .replace(/\bCat\b/g, 'cat')

    const alt = `Pet portrait of a ${speciesFixed} — hand-painted by Faithful Friend Portraits`

    return { path, url: mod.default, alt }
  })

  // Natural sort by filename
  files.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' }))

  // Load dimensions
  const promises = files.map(({ url, alt }) => {
    return new Promise(resolve => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        resolve({
          largeURL: url,
          thumbnailURL: url,
          width: img.naturalWidth,
          height: img.naturalHeight,
          alt
        })
      }
    })
  })

  return Promise.all(promises)
}
