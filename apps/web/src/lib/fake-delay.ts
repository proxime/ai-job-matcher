export const fakeDelay = (ms = 250) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
