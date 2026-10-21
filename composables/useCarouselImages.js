// Turns the build-time portrait list ({ file, width, height }) into gallery items.
// Dimensions come from the build, so no image needs downloading before the gallery renders.
export const useCarouselImages = (portraits) =>
  (portraits ?? []).map(({ file, width, height }) => {
    const name = file.replace(/\.[^/.]+$/, '')
    const readable = name.replace(/_/g, ' ').replace(/-/g, ' ').trim()
    const capitalized = readable.replace(/\b\w/g, c => c.toUpperCase())
    const speciesFixed = capitalized
      .replace(/\bDog\b/g, 'dog')
      .replace(/\bCat\b/g, 'cat')
    const alt = `Pet portrait of a ${speciesFixed} — hand-painted by Faithful Friend Portraits`
    return { largeURL: `/portraits/${file}`, thumbnailURL: `/portraits/${file}`, width, height, alt }
  })
