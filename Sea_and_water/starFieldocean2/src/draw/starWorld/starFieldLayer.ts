import * as P5 from "p5";
import * as Geometry from "../../geometry/geometry";

const createNightField = (
  canvas: CanvasRenderingContext2D,
  backgroundCanvas: P5.Graphics
) => {
  const gradation = canvas.createLinearGradient(
    backgroundCanvas.width / 2.0,
    0.0,
    backgroundCanvas.width / 2.0,
    backgroundCanvas.height
  );

  gradation.addColorStop(0.0, "rgba(10, 10, 30, 1.0)");
  gradation.addColorStop(0.5, "rgba(10, 10, 50, 1.0)");
  gradation.addColorStop(1.0, "rgba(10, 10, 60, 1.0)");
  canvas.fillStyle = gradation;
  canvas.rect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  canvas.fill();
};

/**
 * 
 * @param canvas 
 * @param position 
 * @param size 
 * @param color 
 */
const createStarField = (
  canvas: CanvasRenderingContext2D,
  position: P5.Vector[],
  size: number[],
  color: string[]
) => {
  canvas.save();
  [...Array(position.length).keys()].forEach((count) => {
    canvas.save();
    canvas.translate(position[count].x, position[count].y);
    Geometry.Star2D.drawColor({
      canvas: canvas,
      size: size[count],
      pricleNumber: 5,
      segmentNumber: 5,
      color: color[count],
    });
    canvas.restore();
  });
  canvas.restore();
};

/**
 * 
 * @param backgroundCanvas 
 * @param position 
 * @param size 
 * @param color 
 */
export const StarField = (
  backgroundCanvas: P5.Graphics,
  position: P5.Vector[],
  size: number[],
  color: string[]
) => {
  const canvas = backgroundCanvas.drawingContext.canvas.getContext("2d");
  if (!(canvas instanceof CanvasRenderingContext2D)) {
    throw new Error("Not canvas");
  }
  backgroundCanvas.background(0, 0, 0);

  createNightField(canvas, backgroundCanvas);
  createStarField(canvas, position,size , color);
};

