import * as P5 from "p5";
import * as Shader from "../../shader/shader";
import * as Geometry from "../../geometry/geometry";
interface CanvasStarParameter {
  canvas: P5.Graphics;
  position: P5.Vector;
  size: number;
  velocity: P5.Vector;
}

export class CanvasStar {
  public star: CanvasStarParameter;
  constructor(particle: CanvasStarParameter) {
    this.star = particle;
  }

  updateStar = (): void => {
    this.star.position.sub(this.star.velocity);
  };

  removeStar = (): boolean => {
    const remove = -this.star.canvas.width / 2.0 + 10 <= this.star.position.y;

    return remove;
  };

  drawStar = (uTexture: P5.Image, uFrameCount: number = 0): void => {
    const textureShader = Shader.textureCanvasShader(this.star.canvas);
    this.star.canvas.push();
    this.star.canvas.translate(this.star.position.x, this.star.position.y, 0.0);
    this.star.canvas.rotate(uFrameCount);
    this.star.canvas.shader(textureShader);
    textureShader.setUniform("uTexture", uTexture);
    Geometry.CanvasStar.drawStar({
      canvas: this.star.canvas,
      size: this.star.size,
      pricleNumber: 5,
      segmentNumber: 5,
    });
    this.star.canvas.pop();
  };
}
