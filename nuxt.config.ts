// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@morev/vue-transitions/nuxt",
  ],
  tailwindcss: { exposeConfig: true },
  headlessui: { prefix: "H" },
  app: {
    head: {
      title: "HR Analytics - KPMG",
      link: [
        //Inter font
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },

  routeRules: {
    "/proxy/**": {
      proxy: { to: "http://127.0.0.1:5000/api/**" },
    },
  },
});
