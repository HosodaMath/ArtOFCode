export class Random {
  /**
   * 
   * @param min 
   * @param max 
   * @returns Math.random() * (max - min) + min
   */
  static random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
}
