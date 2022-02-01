import { Vector2 } from "../mathematics/Vector2";

interface Geometry {
  draw(
    fill: string | CanvasGradient | CanvasPattern,
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number
  ): void;

  drawFill(fill: string | CanvasGradient | CanvasPattern): void;

  drawStroke(
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number
  ): void;
}

export class Shape implements Geometry {
  protected gl: CanvasRenderingContext2D;
  protected size: number | Vector2;
  public position: Vector2;
  /**
   * @constructor
   * @param gl
   * @param position
   * @param size
   */
  constructor(
    gl: CanvasRenderingContext2D,
    position: Vector2,
    size: number | Vector2
  ) {
    this.gl = gl;
    this.position = position;
    this.size = size;
  }

  /**
   *
   * @param fill
   * @param stroke
   * @param strokeWidth
   */
  draw(
    fill: string | CanvasGradient | CanvasPattern,
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ) {
    console.log(`Engine: ${this.gl}`);
    console.log(`x: ${this.position.x} y: ${this.position.y}`);
    console.log(`size: ${this.size}`);
    console.log(
      `fill: ${fill}, stroke: ${stroke}, strokeWidth: ${strokeWidth}`
    );
  }

  /**
   *
   * @param fill
   */
  drawFill(fill: string | CanvasGradient | CanvasPattern) {
    console.log(`Engine: ${this.gl}`);
    console.log(`x: ${this.position.x} y: ${this.position.y}`);
    console.log(`size: ${this.size}`);
    console.log(`fill: ${fill}`);
  }

  /**
   *
   * @param stroke
   * @param strokeWidth
   */
  drawStroke(
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ) {
    console.log(`Engine: ${this.gl}`);
    console.log(`x: ${this.position.x} y: ${this.position.y}`);
    console.log(`size: ${this.size}`);
    console.log(`stroke: ${stroke}, strokeWidth: ${strokeWidth}`);
  }
}
