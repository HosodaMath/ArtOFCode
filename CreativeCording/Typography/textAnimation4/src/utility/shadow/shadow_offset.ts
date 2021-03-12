/**
 * @class ShadowOffset
 * @description
 * 影のずらす範囲を設定するクラス
 * shadowOffsetは影の方向を決めるものです
 * @example
 * 
 * let set_shadow_offset: ShadowOffset = new ShadowOffset(5, 5);
 * 
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 * @license MIT
 */
class ShadowOffset {
  public shadow_offset_x: number = 0;
  public shadow_offset_y: number = 0;
  /**
   * 
   * @param {number} shadow_offset_x 
   * @param {number} shadow_offset_y 
   */
  constructor(shadow_offset_x : number, shadow_offset_y: number){
    this.shadow_offset_x = shadow_offset_x;
    this.shadow_offset_y = shadow_offset_y;
  }
}

export {ShadowOffset};