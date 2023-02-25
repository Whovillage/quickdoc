// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  runtimeConfig: {
    deepLApiKey: "DeepL-Auth-Key e7e7721e-11b7-9253-efb4-ef97a54cbef3:fx",
    openAIApiKey: "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",
  },
});
