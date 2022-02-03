import P5 from "p5";

import { NPCBeans } from "../setubun/NPCBeans";
import { CharacterBean } from "../setubun/CharacterBean";
export class Stage {
  private p: P5;
  private mobBeans: NPCBeans;
  private characterBean: CharacterBean;
  public gameState: "play" | "gameOver";
  /**
   * 
   * @param p 
   */
  constructor(p: P5) {
    this.p = p;

    this.mobBeans = new NPCBeans(this.p);

    const characterPosition = p.createVector(p.width * 0.5, p.height * 0.5);
    const characterVelocity = p.createVector(0, 0);
    const characterSize = 200;
    this.characterBean = new CharacterBean(
      p,
      characterPosition,
      characterVelocity,
      characterSize
    );

    this.gameState = "play";
  }

  /**
   * @description ステージの更新
   * @returns 
   */
  public stageUpdate() {
    if (this.gameState === "gameOver") {
      return;
    }

    this.mobBeans.update();

    this.characterBean.applyGravity();
    this.characterBean.update();
    if (this.characterBean.isBeanRemove() === false) {
      this.gameState = "gameOver";
    }
  }

  /**
   * @description ステージの描画
   */
  public stageRender() {
    this.mobBeans.draw();

    this.characterBean.draw();
  }

  public characterControl1() {
    this.characterBean.applyJump();
  }
}
