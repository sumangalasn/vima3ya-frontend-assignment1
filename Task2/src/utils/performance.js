export const logLoadTime = (start) => {
  const end = performance.now();
  console.log(`Model loaded in ${(end - start).toFixed(2)} ms`);
};