// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      useMock: process.env.NODE_ENV !== "production",
      baseUrl: "http://localhost:3000/api",
    },
  },
});
