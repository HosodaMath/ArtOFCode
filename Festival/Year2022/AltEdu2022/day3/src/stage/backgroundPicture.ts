import P5 from "p5";
/**
 * 
 * @param canvas 
 * @returns 
 */
export const createBackgroundPicture = (p: P5, width: number, height: number): P5.Graphics => {
  const canvas = p.createGraphics(width, height);
  const size = 10;
  const strokeSize = 5;
  [...Array(200).keys()].forEach((iterX) => {
    [...Array(100).keys()].forEach((iterY) => {
      let posX = iterX * size;
      let posY = iterY * size;
      canvas.push();
      canvas.translate(posX, posY);
      canvas.fill("#ffe4c4");
      canvas.stroke("#fff6e9");
      canvas.strokeWeight(strokeSize);
      canvas.rect(0, 0, size, size);
      canvas.pop();
    });
  });

  return canvas;
};
