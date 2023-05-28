export default defineNuxtPlugin(async () => {
  const {
    public: { useMock },
  } = useRuntimeConfig();

  if (!useMock) {
    return;
  }

  if (process.client) {
    const { worker } = await import("~/mocks/browser");
    await worker.start();
  } else {
    const { server } = await import("~/mocks/server");
    server.listen();
  }
});
