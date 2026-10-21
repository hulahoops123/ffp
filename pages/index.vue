<template>
  <div ref="mainContainerElement"
    class="flex flex-col w-full mx-auto h-screen bg-neutral-200 overflow-scroll gap-8 p-2 text-amber-950 max-w-6xl">

    <!-- TOP SECTION: Logo and Headline -->
    <div class="w-full flex flex-col gap-4 pt-2 rounded-sm">
      <div class="flex justify-center gap-2 md:gap-4 lg:gap-6 py-2 rounded-lg">
        <img src="~/assets/logo_amber900.png" alt="Logo"
          class="h-10 w-10 rounded-full md:h-14 md:w-14 lg:w-20 lg:h-20" />
        <div
          class="font-clickerscript text-center text-4xl font-semibold underline underline-offset-4 md:text-5xl lg:text-7xl lg:underline-offset-8">
          Faithful Friend Portraits
        </div>
      </div>

      <!-- Hero Image + WhatsApp CTA -->

      <div class="relative mx-0 flex flex-col">
        <img src="~/assets/whatsappbutton.png" alt="Contact via WhatsApp" @click="ctaClicked" :class="[
          'animate-spin',
          isScrolling
            ? (directions.bottom ? 'animation-running animation-normal' : 'animation-running animation-reverse')
            : 'animation-paused',
        ]"
          class="w-10 h-10 rounded-full bg-white/50 fixed right-4 top-1/2 md:right-8 md:h-16 md:w-16 lg:right-16 lg:w-20 lg:h-20" />
      </div>


      <!-- Subheading + Description -->
      <div class="flex flex-col md:gap-4 lg:gap-6 mt-4 p-2 bg-yellow-500/10 rounded-lg">
        <h1 class="font-moondance text-3xl md:text-4xl lg:text-5xl font-semibold">
          Authentic Pet Portraits in South Africa
        </h1>
        <p class="font-moondance text-2xl md:text-3xl lg:text-4xl">
          For hand-painted pet portraits that capture your pet’s unique personality in oil on canvas. Perfect as a
          cherished keepsake, a heartfelt memorial, or a meaningful gift for someone special.
        </p>
      </div>
    </div>

    <!-- IMAGE GALLERY SECTION (Masonry + Lightbox) -->
    <section :id="props.galleryID" ref="galleryElement" class="gallery p-2"
      :class="[galleryRevealed ? 'gallery-revealed' : 'gallery-pending', { 'gallery-animating': galleryAnimating }]">
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <h2 class="sr-only">Examples of our hand-painted pet portraits</h2>

        <a v-for="(image, key) in caroimages2FullData" :key="key" :href="image.largeURL" :data-pswp-width="image.width"
          :data-pswp-height="image.height" rel="noreferrer"
          :class="{ 'tile-placeholder': !loadedImages.has(image.thumbnailURL) }"
          class="gallery-tile block overflow-hidden rounded-lg hover:opacity-80 transition shadow-lg">
          <img :src="image.thumbnailURL" :alt="image.alt" :width="image.width" :height="image.height"
            class="relative w-full h-auto object-cover rounded-lg" :loading="key < 4 ? 'eager' : 'lazy'"
            @load="loadedImages.add(image.thumbnailURL)" />
        </a>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <div>
      <p class="mb-4 font-moondance text-3xl font-bold underline underline-offset-2 md:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </p>
      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-300">
        <button @click="toggle(index)"
          class="w-full text-left py-2 font-moondance text-2xl font-semibold focus:outline-none md:text-3xl lg:text-4xl">
          {{ faq.question }}
        </button>
        <transition name="fade">
          <p v-if="openIndex === index" class="py-2 font-moondance text-2xl md:text-3xl lg:text-4xl mb-4">
            {{ faq.answer }}
          </p>
        </transition>
      </div>
    </div>

    <!-- FOOTER -->
    <p class="font-moondance text-xs font-extralight mt-40 text-slate-500 text-center">
      <span class="text-[6px]">©️ </span> Faithful Friend Portraits - Creating timeless hand-painted pet portraits for clients across South Africa - 2025 all rights reserved
    </p>
    
  </div>
</template>
<script setup>
// Shuffled on the server so every reload shows a fresh order; the client reuses the same order from the payload
const { data: portraitFiles } = await useAsyncData('portraits', async () => {
  const list = [...await $fetch('/api/portraits')]
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]]
  }
  return list
})
const randomPortrait = portraitFiles.value?.[Math.floor(Math.random() * (portraitFiles.value?.length ?? 1))]?.file
const ogImage = `https://faithfulfriendportraits.co.za/portraits/${randomPortrait}`

useHead({
  title: 'Pet Portraits South Africa | Custom Hand-Painted by Faithful Friend Portraits',
  meta: [
    {
      name: 'description',
      content: 'Capture your pet\'s unique personality with custom hand-painted oil portraits. Perfect as a heartfelt gift or cherished keepsake. Order yours today!',
    },
    {
      name: 'google-site-verification',
      content: '6y2ab6hk_xcIMj77YedgAgMp31DaKVDHyG9z1fvLxFo'
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: 'A hand-painted pet portrait by Faithful Friend Portraits' },
    { property: 'og:title', content: 'Pet Portraits South Africa | Faithful Friend Portraits' },
    { property: 'og:description', content: 'Custom hand-painted oil portraits that capture your pet\'s unique personality. Order yours today!' },
    { property: 'og:url', content: 'https://faithfulfriendportraits.co.za' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: ogImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Faithful Friend Portraits",
        "url": "https://faithfulfriendportraits.co.za",
        "description": "Custom hand-painted pet portraits in oil on canvas. Thoughtful gifts and heartfelt memorials.",
        "telephone": "+27739858738",
        "areaServed": "ZA",
        "image": ogImage,
        "sameAs": []
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Faithful Friend Portraits",
        "url": "https://faithfulfriendportraits.co.za"
      })
    }
  ]
})
// 🖼 Import composable for loading gallery images
import { useCarouselImages } from '~/composables/useCarouselImages.js';

// Photoswipe
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const props = defineProps({
  galleryID: {
    type: String,
    default: 'gallery'  // ✅ fallback ID
  }
});

// Rendered server-side with build-time dimensions, so tiles (and their placeholders) are in the first HTML
const caroimages2FullData = computed(() => useCarouselImages(portraitFiles.value));
// Placeholder shimmer is dropped once an image loads (images that finished before hydration are picked up in onMounted)
const loadedImages = reactive(new Set());
let lightbox;

// ✨ Gallery entrance — like Framer's "Animated Masonry Grid": each tile slides in flat from a random
// screen edge (top/bottom/left/right), fading in, staggered in reading order so tiles cross over each other
const galleryElement = ref(null);
const galleryVisible = ref(false);
const galleryRevealed = ref(false);
const galleryAnimating = ref(false);
const TILE_DURATION = 500;
const TILE_STAGGER = 100;

useIntersectionObserver(galleryElement, ([entry], observer) => {
  if (entry?.isIntersecting) {
    galleryVisible.value = true;
    observer.disconnect();
  }
}, { threshold: 0.1 });

watch([galleryVisible, () => caroimages2FullData.value.length], async ([visible, count]) => {
  if (!visible || !count || galleryRevealed.value) return;
  await nextTick();
  const gallery = galleryElement.value.getBoundingClientRect();
  const tiles = [...galleryElement.value.querySelectorAll('.gallery-tile')].map((el) => ({ el, rect: el.getBoundingClientRect() }));
  const order = [...tiles].sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
  const edges = ['top', 'bottom', 'left', 'right'];
  order.forEach(({ el, rect }, i) => {
    const left = rect.left - gallery.left;
    const top = rect.top - gallery.top;
    let dx = 0, dy = 0;
    switch (edges[Math.floor(Math.random() * edges.length)]) {
      case 'top': dy = -200 - top; break;
      case 'bottom': dy = window.innerHeight + 200 - top; break;
      case 'left': dx = -200 - left; break;
      case 'right': dx = window.innerWidth + 200; break;
    }
    el.style.setProperty('--tile-dx', `${Math.round(dx)}px`);
    el.style.setProperty('--tile-dy', `${Math.round(dy)}px`);
    el.style.setProperty('--tile-delay', `${i * TILE_STAGGER}ms`);
  });
  galleryAnimating.value = true;
  galleryRevealed.value = true;
  setTimeout(() => { galleryAnimating.value = false; }, (tiles.length - 1) * TILE_STAGGER + TILE_DURATION + 100);
});

onMounted(() => {
  galleryElement.value.querySelectorAll('.gallery-tile img').forEach((img) => {
    if (img.complete && img.naturalWidth) loadedImages.add(img.getAttribute('src'));
  });

  lightbox = new PhotoSwipeLightbox({
    gallery: '#' + props.galleryID,
    children: 'a',
    pswpModule: () => import('photoswipe'),
    showHideAnimationType: 'fade',
    bgOpacity: 0.9,
    padding: { top: 30, bottom: 30, left: 30, right: 30 },
    wheelToZoom: true,
    clickToCloseNonZoomable: true,
  });

  lightbox.init();
});

onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});

// 🎯 Scroll monitoring
const mainContainerElement = ref(null);
const { isScrolling, directions } = useScroll(mainContainerElement);

// ❓ FAQs section
const openIndex = ref(null);
// ✉️ Email is assembled from parts so the full address never appears in the JS for scrapers
const contactEmail = ['jono', ['faithfulfriendportraits', 'co', 'za'].join('.')].join('@');

const faqs = [
  {
    question: 'How much does a portrait cost?',
    answer:
      'It varies by size but for example an A3 canvas pet portrait is R5000 (framing and delivery not included).'
  },
  {
    question: 'How long does it take?',
    answer:
      'Each pet portrait is hand-painted with care and typically takes 2–3 weeks to complete.'
  },
  {
    question: 'How can I get in touch?',
    answer:
      `WhatsApp or call me on 073 985 8738, or email ${contactEmail}.`
  }
]


const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// 🟢 WhatsApp button logic
const ctaClicked = () => {
  const url =
    navigator.maxTouchPoints > 0
      ? 'https://api.whatsapp.com/send?phone=27739858738&text=FFPortraits+web+query:'
      : 'https://web.whatsapp.com/send/?phone=27739858738&text=FFPortraits+web+query:';
  window.open(url);
};
</script>




<style>
/* ✨ Gallery entrance animation (offsets/delays set per tile in script) */
.gallery-animating {
  overflow: clip;
}

.gallery-pending .gallery-tile {
  opacity: 0;
}

.gallery-revealed .gallery-tile {
  animation: tile-in 0.5s ease-out backwards;
  animation-delay: var(--tile-delay, 0ms);
}

@keyframes tile-in {
  from {
    opacity: 0;
    transform: translate(var(--tile-dx, 0px), var(--tile-dy, 0px));
  }
}

/* 🖼 Shimmer behind each image until it loads and paints over it (tile is sized from build-time dimensions) */
.tile-placeholder {
  position: relative;
  background-color: rgb(120 53 15 / 0.08);
}

.tile-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, rgb(255 255 255 / 0.5) 50%, transparent 70%);
  background-size: 200% 100%;
  animation: tile-shimmer 1.4s linear infinite;
}

@keyframes tile-shimmer {
  from {
    background-position: 150% 0;
  }

  to {
    background-position: -50% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile-placeholder::before {
    animation: none;
  }

  .gallery-pending .gallery-tile {
    opacity: 1;
  }

  .gallery-revealed .gallery-tile {
    animation: none;
  }
}
</style>
