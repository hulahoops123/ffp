// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  devServer: {
    port: 4000,
  },

  modules:[
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    'vue3-carousel-nuxt',
    '@nuxt/image',
  ],

  googleFonts: {
    display: "swap",
    families: {
      'Raleway': true,
      'Staatliches':true,
      'Clicker Script':true,
      'Quintessential':true,
      'Moon Dance':true,
    }
  },

  compatibilityDate: '2025-03-06',
})