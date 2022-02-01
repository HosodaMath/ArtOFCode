import { Rectangle } from "./geometry/Rectangle";
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

  const setup = () => {
    width = canvas.width = 1000;
    height = canvas.height = 1000;

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

    const gradationColor1 = gl.createLinearGradient(
      width * 0.5,
      0,
      width * 0.5,
      height
    );
    gradationColor1.addColorStop(0.0, "#ffff00");
    gradationColor1.addColorStop(0.5, "#ffa500");
    gradationColor1.addColorStop(1.0, "#7fffd4");

    [...Array(10).keys()].forEach((shiftX) => {
      [...Array(10).keys()].forEach((shiftY) => {
        const position = new Vector2(shiftX * 100, shiftY * 100);
        const size = new Vector2(50, 50);
        const rect = new Rectangle(gl, position, size);
        rect.drawFill(gradationColor1);
      });
    });

    const gradationColor2 = gl.createLinearGradient(
      width * 0.5,
      0,
      width * 0.5,
      height
    );
    gradationColor2.addColorStop(0.0, "#7fffd4");
    gradationColor2.addColorStop(0.5, "#ffa500");
    gradationColor2.addColorStop(1.0, "#ffff00");
    [...Array(10).keys()].forEach((shiftX) => {
      [...Array(10).keys()].forEach((shiftY) => {
        const position = new Vector2(shiftX * 100 + 50, shiftY * 100 + 50);
        const size = new Vector2(50, 50);
        const rect = new Rectangle(gl, position, size);
        rect.drawFill(gradationColor2);
      });
    });

    requestAnimationFrame(draw);
  };

  const mouseClicked = () => {};

  canvas.addEventListener("mousedown", (event: MouseEvent) => {
    mouseClicked();
  });

  const mouseMove = (event: MouseEvent) => {};

  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    mouseMove(event);
  });

  const keyPush = (event: KeyboardEvent) => {
    if (event.key === "f" || event.key === "F") {
      console.log("key fが押されました");
    }
  };

  canvas.addEventListener("keydown", (event: KeyboardEvent) => {
    keyPush(event);
  });

  setup();
  draw();
});
