/**
 * 
 */
export class Mathematics {
  /**
   * @description degree -> radian
   * @static  degTorad
   * @param degree
   * @returns ラジアンを出力
   */
  static degTorad = (degree: number) => {
    return (degree * Math.PI) / 180;
  };
}
