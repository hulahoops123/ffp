export const useCarouselImages = async () => {
  const files = await $fetch('/portraits-list.json')

  const items = files.map(filename => {
    const name = filename.replace(/\.[^/.]+$/, '')
    const readable = name.replace(/_/g, ' ').replace(/-/g, ' ').trim()
    const capitalized = readable.replace(/\b\w/g, c => c.toUpperCase())
    const speciesFixed = capitalized
      .replace(/\bDog\b/g, 'dog')
      .replace(/\bCat\b/g, 'cat')
    const alt = `Pet portrait of a ${speciesFixed} — hand-painted by Faithful Friend Portraits`
    return { largeURL: `/portraits/${filename}`, thumbnailURL: `/portraits/${filename}`, alt }
  })

  const promises = items.map(({ largeURL, thumbnailURL, alt }) =>
    new Promise(resolve => {
      const img = new Image()
      img.src = largeURL
      img.onload = () => resolve({ largeURL, thumbnailURL, width: img.naturalWidth, height: img.naturalHeight, alt })
    })
  )

  return Promise.all(promises)
}
