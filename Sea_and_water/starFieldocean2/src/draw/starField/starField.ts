import * as P5 from "p5";
/**
 *
 */
export interface StarFieldParamter {
  canvas: CanvasRenderingContext2D;
  position: P5.Vector[];
  velocity: P5.Vector[];
  size: number[];
  starColor: string[];
  theta: number[];
  starFildSize: number[];
}

/**
 * @class StarField
 */
export class StarField {
  public starFieldParameter: StarFieldParamter;
  /**
   *
   * @param starFieldParameter
   */
  constructor(starFieldParameter: StarFieldParamter) {
    this.starFieldParameter = starFieldParameter;
  }

  update(mousePosition: P5.Vector) {
    [...Array(this.starFieldParameter.position.length).keys()].forEach(
      (count) => {
        this.starFieldParameter.theta[count] +=
          this.starFieldParameter.velocity[count].x;

        this.starFieldParameter.theta[count] +=
          this.starFieldParameter.velocity[count].y;

        this.starFieldParameter.position[count].x =
          mousePosition.x +
          Math.cos(this.starFieldParameter.theta[count]) *
            this.starFieldParameter.starFildSize[count];

        this.starFieldParameter.position[count].y =
          mousePosition.y +
          Math.sin(this.starFieldParameter.theta[count]) *
            this.starFieldParameter.starFildSize[count];
      }
    );
  }

  draw() {
    this.starFieldParameter.canvas.save();
    [...Array(this.starFieldParameter.position.length).keys()].forEach(
      (count) => {
        this.starFieldParameter.canvas.save();

        this.starFieldParameter.canvas.beginPath();

        this.starFieldParameter.canvas.shadowColor =
          this.starFieldParameter.starColor[count];

        this.starFieldParameter.canvas.shadowBlur = 10;

        this.starFieldParameter.canvas.fillStyle =
          this.starFieldParameter.starColor[count];

        this.starFieldParameter.canvas.translate(
          this.starFieldParameter.position[count].x,
          this.starFieldParameter.position[count].y
        );

        this.starFieldParameter.canvas.arc(
          0,
          0,
          this.starFieldParameter.size[count],
          0,
          Math.PI * 2.0
        );
        this.starFieldParameter.canvas.closePath();
        this.starFieldParameter.canvas.fill();
        this.starFieldParameter.canvas.restore();
      }
    );

    this.starFieldParameter.canvas.restore();
  }
}
