import P5 from "p5";
const sankuzushiYoko = (canvas: P5.Graphics) => {
  const sizeX = 100;
  const sizeY = 25;
  const shiftY = 10;
  canvas.fill(200, 200, 200);
  canvas.push();
  canvas.translate(0, 0);
  canvas.rect(0, 0, sizeX, sizeY);
  canvas.pop();
  canvas.push();
  canvas.translate(0, sizeY + shiftY);
  canvas.rect(0, 0, sizeX, sizeY);
  canvas.pop();
  canvas.push();
  canvas.translate(0, sizeY * 2.0 + shiftY * 2.0);
  canvas.rect(0, 0, sizeX, sizeY);
  canvas.pop();
};

const sankuzushiTate = (canvas: P5.Graphics) => {
  const sizeX = 25;
  const sizeY = 100;
  const shiftX = 10;
  canvas.fill(200, 200, 200);
  canvas.push();
  canvas.translate(0, 0);
  canvas.rect(0, 0, sizeX, sizeY);
  canvas.pop();
  canvas.push();
  canvas.translate(sizeX + shiftX, 0);
  canvas.rect(0, 0, sizeX, sizeY);
  canvas.pop();
  canvas.push();
  canvas.translate(sizeX * 2.0 + shiftX * 2.0, 0);
  canvas.rect(0, 0, sizeX, sizeY);
  canvas.pop();
};

export const sankuzushi = (p: P5.Graphics) => {
  p.push();
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      if (x % 2 !== 0 && y % 2 === 0) {
        p.push();
        p.translate(x * 1.2 * 100, y * 1.15 * 100, 0);
        sankuzushiTate(p);
        p.pop();
      } else if (x % 2 === 0 && y % 2 !== 0) {
        p.push();
        p.translate(x * 1.2 * 100, y * 1.15 * 100, 0);
        sankuzushiTate(p);
        p.pop();
      } else {
        p.push();
        p.translate(x * 1.2 * 100, y * 1.15 * 100, 0);
        sankuzushiYoko(p);
        p.pop();
      }
    }
  }

  p.pop();
};
