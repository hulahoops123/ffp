# Faithful Friend Portraits - Site Instructions

## Adding New Carousel Images

### 1. Convert Image to WebP Format

New paintings need to be converted to match the carousel format:

```bash
# Convert and resize image to WebP (800px max dimension)
ffmpeg -i YOUR_IMAGE.jpg -vf "scale='if(gt(iw,ih),800,-2)':'if(gt(iw,ih),-2,800)'" -q:v 85 OUTPUT_NAME.webp
```

**Example:**
```bash
ffmpeg -i IMG20251124213913.jpg -vf "scale='if(gt(iw,ih),800,-2)':'if(gt(iw,ih),-2,800)'" -q:v 85 ginger_cat_hamish.webp
```

This will:
- Convert to WebP format
- Resize to 800px on longest side (maintains aspect ratio)
- Optimize quality (q:v 85)
- Result in ~15-30KB file size

### 2. Naming Convention

**Format:** `{breed/description}_{animal-type}_{name}.webp`

**Rules:**
- Use **underscores** `_` to separate the three main parts
- Use **hyphens** `-` for compound words within each part
- Keep everything lowercase
- Animal type is usually `dog` or `cat`

**Examples:**
```
black-labrador_dog_stryder.webp
ginger_cat_hamish.webp
yorkshire-terrier_dog_loki-and-thor.webp
husky-cross_dog_sky.webp
rottweiler-and-labrador_dog_tyson-and-mila.webp
```

### 3. How the Naming Works

The site automatically generates SEO-friendly alt text from filenames:

**Filename:** `ginger_cat_hamish.webp`

**Becomes:**
1. Converts to readable text: "Ginger cat Hamish"
2. Generates alt text: "Pet portrait of a Ginger cat Hamish — hand-painted by Faithful Friend Portraits"

**This helps with:**
- Google Image Search rankings
- Accessibility (screen readers)
- SEO optimization

### 4. Adding to Site

1. Convert your image using the ffmpeg command above
2. Name it following the convention
3. Copy to: `assets/carousel_images/`
4. Rebuild/redeploy the site

The image will automatically appear in the gallery.

---

## How the Site Works

### Font Loading (FOUT Fix)

**Configuration:** `nuxt.config.ts`

```javascript
googleFonts: {
  display: "fallback",  // 100ms wait, minimal FOUT
  families: {
    'Clicker Script': true,   // Main headline
    'Moon Dance': true,        // Body text
  }
}
```

- Fonts are **self-hosted** (downloaded at build time)
- `display: "fallback"` = brief 100ms wait, then swap
- Only loads fonts actually used (~119KB total)
- Minimal Flash of Unstyled Text (FOUT)

### Image Gallery

**File:** `composables/useCarouselImages.js`

- Automatically loads all images from `assets/carousel_images/`
- Parses filenames to generate alt text
- Integrates with PhotoSwipe lightbox
- Supports: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### Main Page Structure

**File:** `pages/index.vue`

**Sections:**
1. **Header** - Animated logo + headline (Clicker Script font)
2. **Hero** - Subheading + description (Moon Dance font)
3. **Gallery** - Masonry grid with lightbox (PhotoSwipe)
4. **FAQ** - Accordion-style questions/answers
5. **Footer** - Copyright info

**Key Features:**
- WhatsApp CTA button (spins on scroll)
- Animated headline (types out letter by letter)
- Responsive design (mobile, tablet, desktop)
- PhotoSwipe lightbox for image viewing

### SEO Setup

**Configured in:** `pages/index.vue` (lines 81-117)

- Custom meta title and description
- Google site verification
- Schema.org structured data:
  - ProfessionalService
  - WebSite
- Sitemap generation via `@nuxtjs/sitemap`

### Tech Stack

- **Framework:** Nuxt 3
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (self-hosted)
- **Images:** @nuxt/image
- **Gallery:** PhotoSwipe lightbox
- **Utils:** VueUse composables

---

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server (localhost:4000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

---

## File Structure

```
ffportraits_1/
├── assets/
│   ├── carousel_images/     # Gallery images (WebP format)
│   ├── logo_amber900.png    # Logo
│   └── whatsappbutton.png   # WhatsApp CTA
├── components/
│   └── paintingZoom.vue     # Image zoom component
├── composables/
│   └── useCarouselImages.js # Gallery image loader
├── pages/
│   └── index.vue            # Main landing page
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # Tailwind + custom fonts
└── package.json             # Dependencies
```

---

## Quick Reference

### Add New Image
1. `ffmpeg -i input.jpg -vf "scale='if(gt(iw,ih),800,-2)':'if(gt(iw,ih),-2,800)'" -q:v 85 breed_animal_name.webp`
2. Copy to `assets/carousel_images/`
3. Deploy

### Update Content
- Main text: `pages/index.vue`
- FAQ: `pages/index.vue` (lines 165-201)
- Fonts: `nuxt.config.ts` + `tailwind.config.js`

### Deploy
1. Push to Git
2. Build automatically triggers
3. Changes go live

---

## Support

For issues or questions, refer to:
- Nuxt docs: https://nuxt.com/docs
- Tailwind docs: https://tailwindcss.com/docs
- PhotoSwipe docs: https://photoswipe.com/

---

**Last Updated:** November 2025
