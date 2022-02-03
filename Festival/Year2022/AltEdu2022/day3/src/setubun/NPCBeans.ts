import P5 from "p5";
import { Bean } from "./Bean";
export class NPCBeans {
  private p: P5;
  private beans: Bean[];
  constructor(p: P5) {
    this.p = p;
    this.beans = [];
  }
  /**
   * @description NPCBeanたちを追加する
   * @private
   */
  private addNPCBeans() {
    const initX = this.p.random(0, this.p.width);
    const initY = 0;
    const position = this.p.createVector(initX, initY);
    const velocity = this.p.createVector(0, 1.0);
    console.log(position.x, position.y);
    const bean = new Bean(this.p, position, velocity);
    this.beans.push(bean);
  }

  /**
   * @description NPCたちを更新する
   */
  public update() {
    if (this.p.frameCount % 120 === 1) {
      this.addNPCBeans();
    }

    for(const bean of this.beans){
      bean.update();
    }

    this.beans = this.beans.filter((bean) => bean.isBeanRemove());
  }

  /**
   * @description NPCたちを描画する
   */
  public draw(){
    for(const bean of this.beans){
      bean.draw();
    }
  }
}
