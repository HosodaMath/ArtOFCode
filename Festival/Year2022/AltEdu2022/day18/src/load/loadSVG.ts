export const loadSVG = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl);

  const svgCode = await response.text();

  return svgCode;
};
