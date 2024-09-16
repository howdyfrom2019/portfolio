export const getLocalPortfolioAssetPath = async (
  key: string,
  start: number,
  end?: number,
  extension?: string
) => {
  const images: string[] = [];
  for (let i = start; i <= (end || start); i++) {
    const { default: path } = await import(
      `../assets/png/portfolio${i}.${extension || "png"}`
    );
    images.push(path);
  }
  return { key, images };
};
