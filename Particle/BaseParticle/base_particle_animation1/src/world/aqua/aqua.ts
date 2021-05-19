import * as Draw from "../../draw/draw";

export const aqua = (
  gl: CanvasRenderingContext2D,
  canvas_size: Draw.Vector2
) => {
  const startSize = new Draw.Vector2(0, 0);
  const windowSize = canvas_size;

  const gradColor = gl.createLinearGradient(
    windowSize.x / 2.0,
    0,
    windowSize.x / 2.0,
    windowSize.y
  );
  gradColor.addColorStop(0.0, "rgb(0, 250, 250)");
  gradColor.addColorStop(0.5, "rgb(0, 150, 200)");
  gradColor.addColorStop(1.0, "rgb(0, 50, 100)");

  const rect = new Draw.Rectangle(gl, startSize, windowSize);
  rect.draw_fill(gradColor);
};
