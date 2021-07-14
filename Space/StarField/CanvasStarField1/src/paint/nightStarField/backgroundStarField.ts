import * as Draw from "../../draw/draw";
export const backgroundStarField = (
  gl: CanvasRenderingContext2D,
  o: Draw.Vector2,
  canvasSize: Draw.Vector2
) => {
  const StarMax = 200;
  const starColorSet = [
    "rgba(245, 250, 200, 1.0)",
    "rgba(200, 200, 250, 1.0)",
    "rgba(200, 250, 250, 1.0)",
  ];
  [...Array(StarMax).keys()].forEach((_count) => {
    const position = new Draw.Vector2(
      Draw.Random.random(o.x, canvasSize.x),
      Draw.Random.random(o.y, canvasSize.y)
    );

    const radius = Draw.Random.random(1, 3);
    const star = new Draw.Circle(gl, position, radius);

    const choice = Math.floor(Draw.Random.random(0, starColorSet.length));
    gl.save();
    gl.shadowColor = starColorSet[choice];
    gl.shadowBlur = 10;
    star.draw_fill(starColorSet[choice]);
    gl.restore();
  });
};
