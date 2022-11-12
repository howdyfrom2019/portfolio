export const ImageLoader = async () => {
  const images = [];
  for (let i = 1; i <= 4; i++) {
    const { default: path } = await import(`../assets/png/portfolio${i}.png`);
    images.push(path);
  }
  return images;
}