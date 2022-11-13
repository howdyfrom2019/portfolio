export const ImageLoader = async (start: number, end?: number, extension?: string) => {
  const images = [];
  for (let i = start; i <= (end || start); i++) {
    const { default: path } = await import(`../assets/png/portfolio${i}.${extension || "png"}`);
    images.push(path);
  }
  return images;
}