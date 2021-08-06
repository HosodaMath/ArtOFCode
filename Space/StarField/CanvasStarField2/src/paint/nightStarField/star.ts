import * as Draw from "../../draw/draw";
export class Star {
  private gl: CanvasRenderingContext2D;
  private position: Draw.Vector2;
  private velocity: Draw.Vector2;
  private size: number;
  /**
   *
   * @param gl
   * @param position
   * @param velocity
   * @param size
   */
  constructor(
    gl: CanvasRenderingContext2D,
    position: Draw.Vector2,
    velocity: Draw.Vector2,
    size: number
  ) {
    this.gl = gl;
    this.position = position;
    this.velocity = velocity;
    this.size = size;
  }

  /**
   *
   */
  updateStar = (canvas_size: Draw.Vector2) => {
    this.position.add(this.velocity);

    if ( this.position.x > canvas_size.x) {
      this.position.x = Draw.Random.random(-10, -5);
    }

    if (this.position.y > canvas_size.y) {
      this.position.y = Draw.Random.random(-10, -5);
    }
  };

  /**
   *
   * @param pricleNumber
   * @param starColor
   */
  drawStar = (pricleNumber: number, starColor: string, time: number) => {
    const vertexNumber = pricleNumber * 2.0;
    this.gl.save();
    // translate and rotate
    this.gl.translate(this.position.x, this.position.y);
    this.gl.rotate(time);

    // color and shadow
    this.gl.shadowColor = starColor;
    this.gl.shadowBlur = 10;
    this.gl.fillStyle = starColor;

    this.gl.beginPath();
    [...Array(vertexNumber).keys()].forEach((count) => {
      const vertex = count % 2 ? this.size : this.size / 2.0;
      if (count === 0) {
        this.gl.moveTo(
          vertex * Math.cos((Math.PI * 2 * count) / vertexNumber),
          vertex * Math.sin((Math.PI * 2 * count) / vertexNumber)
        );
      } else {
        this.gl.lineTo(
          vertex * Math.cos((Math.PI * 2 * count) / vertexNumber),
          vertex * Math.sin((Math.PI * 2 * count) / vertexNumber)
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
    this.gl.restore();
  };
}
