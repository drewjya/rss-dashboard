// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 8800,
  },

  devtools: { enabled: true },
  experimental: { typedPages: true },

  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    ["@pinia/nuxt", { autoImports: ["defineStore", "defineStore"] }],
    "@nuxt/image",
  ],

  imports: {
    autoImport: true,
    dirs: ["stores"],
  },

  colorMode: { preference: "system", fallback: "light", classSuffix: "" },
  spaLoadingTemplate: true,
  css: ["@/assets/app.css"],
  app: {
    head: {
      title: "RSS Dashboard",
      viewport: "width=device-width,initial-scale=1",
    },
  },

  runtimeConfig: {
    PRIVATE_KEY: "",
    IV_KEY: "",
    public: {
      REFRESH_TOKEN_KEY: "RSS_DASHBOARD_TOKEN_STORAGE_KEY",
      API_BASE_URL: "http://localhost:3000/",
      BASE_API_RSS: "",
    },
  },
});
