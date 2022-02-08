export class Mathematics {
  /**
   * @description 度数法から弧度法への変換
   * @param degree 
   * @returns 
   */
  static degTorad = (degree: number): number => {
    return (degree * Math.PI) / 180;
  };
}
