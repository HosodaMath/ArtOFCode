import * as P5 from "p5";
import * as Vector from "./math/vector";
import * as Color from "./color/color";

export class Satellite {
  private p: P5;
  private position: Vector.Vector3;
  private velocity: Vector.Vector3;
  /**
   * @constructor
   * @param p
   * @param position
   * @param velocity
   */
  constructor(p: P5, position: Vector.Vector3, velocity: Vector.Vector3) {
    this.p = p;
    this.position = position;
    this.velocity = velocity;
  }

  satelliteUpdate = () => {
    this.position.add(this.velocity);

    if (this.position.z > this.p.width * 0.25) {
      this.position.z = -this.p.width * 0.5;
    }
  };

  /**
   *
   */
  createSatellite = (bodyColor: Color.colorRGB, wingColor: Color.colorRGB) => {
    this.p.push();
   
    {
      this.p.push();
      this.p.translate(
        this.position.x - this.p.width * 0.125,
        this.position.y,
        this.position.z
      );
      this.p.rotateX(this.p.frameCount * 0.01);
      this.p.scale(1.0);
      this.p.ambientMaterial(wingColor.r, wingColor.g, wingColor.b);
      this.p.specularMaterial(wingColor.r, wingColor.g, wingColor.b);
      this.p.box(
        this.p.width * 0.15,
        this.p.width * 0.0025,
        this.p.width * 0.05
      );
      this.p.pop();

      this.p.push();
      this.p.translate(
        this.position.x + this.p.width * 0.125,
        this.position.y,
        this.position.z
      );
      this.p.rotateX(this.p.frameCount * 0.01);
      this.p.scale(1.0);
      this.p.ambientMaterial(wingColor.r, wingColor.g, wingColor.b);
      this.p.specularMaterial(wingColor.r, wingColor.g, wingColor.b);
      this.p.box(
        this.p.width * 0.15,
        this.p.width * 0.0025,
        this.p.width * 0.05
      );
      this.p.pop();

      this.p.push();
      this.p.translate(this.position.x, this.position.y, this.position.z);
      this.p.scale(1.0);
      this.p.ambientMaterial(bodyColor.r, bodyColor.g, bodyColor.b);
      this.p.specularMaterial(bodyColor.r, bodyColor.g, bodyColor.b);
      this.p.sphere(this.p.width * 0.05, 200, 200);
      this.p.pop();
    }
    this.p.pop();
  };
}
