import * as P5 from "p5";
import * as GLMath from "../math/vector2";
import * as Geometry from "../geometry/geometry";
export class FireFlowerShader {
  private p: P5;
  private fireLocation: GLMath.Vector2;
  private fireVelocity: GLMath.Vector2;
  private fireSize: number;
  private fireColorImage: P5.Image;
  private fireColor: P5.Shader;
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
    fireColorImage: P5.Image,
    fireColor: P5.Shader
  ) {
    this.p = p;
    this.fireLocation = fireLocation;
    this.fireVelocity = fireVelocity;
    this.fireSize = fireSize;
    this.fireColorImage = fireColorImage;
    this.fireColor = fireColor;
  }

  updateParticle = () => {
    this.fireLocation.add(this.fireVelocity);
  };

  drawParticle = (rgb: number[]) => {
    this.p.shader(this.fireColor);
    this.fireColor.setUniform("uColor", rgb);
    this.p.push();
    // this.p.stroke(this.fireColor);
    this.p.noStroke();
    this.p.translate(this.fireLocation.x, this.fireLocation.y);
    this.p.rotate(this.p.radians(this.p.frameCount * 0.05));
    Geometry.Object2D.star(this.p, this.fireSize, 5, 200);
    this.p.pop();
    this.p.resetShader();
  };
}
