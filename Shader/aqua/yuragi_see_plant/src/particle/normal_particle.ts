import * as P5 from "p5";
import * as Vector from "../math/vector3";

export class NormalParticle {
  public position: Vector.Vector3;
  public velocity: Vector.Vector3;
  public radius: number;
  public p: P5;
  constructor(
    p: P5,
    position: Vector.Vector3,
    velocity: Vector.Vector3,
    radius: number
  ) {
    this.p = p;
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }

  updateParticle = () => {
    this.position.add(this.velocity);
  };

  drawParticle = (fillColor: string, strokeColor: string) => {
    this.p.push();
    this.p.translate(this.position.x, this.position.y, this.position.z);
    this.p.stroke(strokeColor);
    this.p.fill(fillColor);
    this.p.circle(0, 0, this.radius);
    this.p.pop();
  };
}
