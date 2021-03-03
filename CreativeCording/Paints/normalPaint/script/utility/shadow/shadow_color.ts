/**
 * @class
 * @description
 * 影の色1と影の色2を設定するクラス
 * @example
 * // 16進数でも
 * set_shadow_color1: BaseShadow = new BaseShadow("#000000", "#ffffff");
 * // rgbやrgbaでも大丈夫
 * set_shadow_color12: BaseShadow = new BaseShadow("rgba(0, 0, 0, 0.5)", "rgba(255, 255, 255, 0.5)");
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 * @license MIT
 */
class ShadowColor {
  public shadow_color1: string = "";
  public shadow_color2: string = "";
  /**
   * 影の色1と影の色2を設定
   * @param {string} shadow_color1 - 影の色1
   * @param {string} shadow_color2 - 影の色2
   */
  constructor(shadow_color1: string, shadow_color2: string){
    this.shadow_color1 = shadow_color1;
    this.shadow_color2 = shadow_color2;
    
  }
}

export {ShadowColor};