/**
 *
 */
export class Calc {
  /**
   * @description degree -> radian
   * @static  degTorad
   * @param degree
   * @returns ラジアンを出力
   */
  static degTorad = (degree: number) => {
    return (degree * Math.PI) / 180;
  };

  /**
   *
   * @param start
   * @param stop
   * @param amp
   * @returns
   */
  static lerp = (start: number, stop: number, amp: number) => {
    return start + amp * (stop - start);
  };
}
