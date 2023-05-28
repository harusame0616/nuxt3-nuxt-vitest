export default defineNuxtPlugin(async () => {
  if (process.client) {
    const { worker } = await import("~/mocks/browser");
    await worker.start();
  } else {
    const { server } = await import("~/mocks/server");
    server.listen();
  }
});
