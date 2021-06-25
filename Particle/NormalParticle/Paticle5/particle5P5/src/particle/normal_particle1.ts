import * as P5 from "p5";
import * as Vector from "../vector/vector2";
/**
 * 通常のParticle
 * 円の形をしている
 * 跳ね返りがある
 */
export class NormalParticle1 {
  public position: Vector.Vector2;
  public velocity: Vector.Vector2;
  public radius: number;
  public p: P5;
  /**
   * 
   * @param p 
   * @param position 
   * @param velocity 
   * @param radius 
   */
  constructor(
    p: P5,
    position: Vector.Vector2, 
    velocity: Vector.Vector2, 
    radius: number
  ){
    this.p = p;
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }

  updateParticle = () => {
    this.position.add(this.velocity);
    if(this.position.x < 0 || this.position.x > this.p.width){
      this.velocity.x *= -1;
    }

    if(this.position.y < 0 || this.position.y > this.p.height){
      this.velocity.y *= -1;
    }
  }

  drawParticle = (fillColor: string, strokeColor: string) => {
    this.p.strokeWeight(2.0)
    this.p.stroke(strokeColor);
    this.p.fill(fillColor);
    this.p.circle(this.position.x, this.position.y, this.radius);
  }
}