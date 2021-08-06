import * as P5 from "p5";
import * as GLMath from "../math/vector2";
import * as Geometry from "../geometry/geometry";
export class FireFlower {
  private p: P5;
  private fireLocation: GLMath.Vector2;
  private fireVelocity: GLMath.Vector2;
  private fireSize: number;
  private fireColor: P5.Color;
  /**
   *
   * @param p
   * @param fireLocation
   * @param fireVelocity
   * @param fireSize
   * @param fireColor
   */
  constructor(
    p: P5,
    fireLocation: GLMath.Vector2,
    fireVelocity: GLMath.Vector2,
    fireSize: number,
    fireColor: P5.Color
  ) {
    this.p = p;
    this.fireLocation = fireLocation;
    this.fireVelocity = fireVelocity;
    this.fireSize = fireSize;
    this.fireColor = fireColor;
  }

  updateParticle = () => {
    this.fireLocation.add(this.fireVelocity);
  };

  drawParticle = () => {
    this.p.push();
    this.p.fill(this.fireColor);
    // this.p.stroke(this.fireColor);
    this.p.noStroke();
    this.p.translate(this.fireLocation.x, this.fireLocation.y);
    Geometry.Object2D.circle(this.p, this.fireSize);
    this.p.pop();
  };
}
