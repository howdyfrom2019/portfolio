export const ImageLoader = async (start: number, end: number) => {
  const images = [];
  for (let i = start; i <= end; i++) {
    const { default: path } = await import(`../assets/png/portfolio${i}.png`);
    images.push(path);
  }
  return images;
}