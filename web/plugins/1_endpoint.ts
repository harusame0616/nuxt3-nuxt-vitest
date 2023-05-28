export default defineNuxtPlugin(() => {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();

  setBaseURL(baseUrl);
});
