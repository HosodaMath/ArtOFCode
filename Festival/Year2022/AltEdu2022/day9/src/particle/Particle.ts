import P5 from "p5";
export class Particle {
  private p: P5;
  private position: P5.Vector;
  private velocity: P5.Vector;
  private accelaration: P5.Vector;
  private lifeSpan: number;
  private texture: P5.Image;
  /**
   * 
   * @param p 
   * @param position 
   * @param velocity 
   * @param img 
   */
  constructor(p: P5, position: P5.Vector, velocity: P5.Vector, img: P5.Image) {
    this.p = p;
    this.position = position.copy();
    this.velocity = velocity;
    this.accelaration = p.createVector();
    this.lifeSpan = 255.0;
    this.texture = img;
  }

  /**
   * @public
   * @description 力を加える
   * @param force 
   */
  public applyForce(force: P5.Vector){
    this.accelaration.add(force);
  }

  /**
   * @public
   * @description 座標の更新
   */
  public update(){
    this.velocity.add(this.accelaration);
    this.position.add(this.velocity);
    this.lifeSpan -= 1.0;
    this.accelaration.mult(0);
  }

  /**
   * @public
   * @description 描画
   */
  public draw(){
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.imageMode(this.p.CENTER);
    this.p.tint(255, this.lifeSpan);
    // 配列の制御確認用
    // this.p.tint(255);
    this.p.image(this.texture, 0, 0, 32, 32);
    this.p.pop();
  }

  public isRemove(){
    const originX = this.position.x > 0;
    const originY = this.position.y > 0;
    const widthX = this.position.x < this.p.width;

    return (originX || originY) && (widthX || originY);
  }
}
