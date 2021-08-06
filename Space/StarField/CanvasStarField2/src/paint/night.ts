import * as Draw from "../draw/draw";
export const night = (
  gl: CanvasRenderingContext2D,
  o: Draw.Vector2,
  canvasSize: Draw.Vector2
) => {
  const night = new Draw.Rectangle(gl, o, canvasSize);
  const nightColor = gl.createLinearGradient(
    canvasSize.x / 2.0,
    o.x,
    canvasSize.x / 2.0,
    canvasSize.y
  );

  nightColor.addColorStop(0.0, "rgba(2, 2, 30, 1.0)");
  nightColor.addColorStop(0.5, "rgba(21, 21, 40, 1.0)");
  nightColor.addColorStop(1.0, "rgba(26, 26, 60, 1.0)");

  night.draw_fill(nightColor);
};
