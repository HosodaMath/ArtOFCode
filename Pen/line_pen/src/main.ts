import { Line } from "./geometry/Line";
import { Vector2 } from "./mathematics/Vector2";
import { resize } from "./window/resize";
import { fullScreen } from "./window/fullScreen";
import "./sanitize.css";
import "./main.css";
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const gl = canvas.getContext("2d");
  if (!gl) {
    throw new Error("Error");
  }

  let width: number;
  let height: number;
  let line1: Line;
  let line2: Line;
  const setup = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const point1 = new Vector2(width * 0.5, 0);
    const point2 = new Vector2(width * 0.5, height);
    line1 = new Line(gl, point1, point2);

    const point3 = new Vector2(0, height * 0.5);
    const point4 = new Vector2(width, height * 0.5);
    line2 = new Line(gl, point3, point4);

    resize(canvas, width, height);
    fullScreen(document.body);
  };

  const background = (color: string | CanvasGradient | CanvasPattern) => {
    gl.fillStyle = color;
    gl.rect(0, 0, canvas.width, canvas.height);
    gl.fill();
  };

  const draw = () => {
    background("#000000");

    line1.draw("#ffffff");
    line2.draw("#ffffff");

    mouseMove();

    // requestAnimationFrame(draw);
  };

  const mouseMove = () => {
    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      const x = event.offsetX;
      const y = event.offsetY;
      const grad = gl.createLinearGradient(width * 0.5, 0, width * 0.5, height);
      grad.addColorStop(0.0, "#ffff00");
      grad.addColorStop(0.5, "#ffa500");
      grad.addColorStop(1.0, "#7fffd4");
      const point1 = new Vector2(width * 0.5, height * 0.5);
      const point2 = new Vector2(x, y);
      const line = new Line(gl, point1, point2);
      line.draw(grad, 2);
    });
  };

  /*
  const keyPush = () => {
    canvas.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "f" || event.key === "F") {
        console.log("key fが押されました");
      }
    });
  };*/

  setup();
  draw();
});
