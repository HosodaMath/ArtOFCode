class Color {
  private r: number = 0
  private g: number = 0
  private b: number = 0
  /**
   * set color
   * @param {number} r - red
   * @param {number} g - green
   * @param {number} b - blue
   */
  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  /**
   * @method
   */
  public rgb = () => {
    return `rbg(${this.r}, ${this.g}, ${this.b})`;
  }

  /**
   * @method
   * @param {number} alpha - alpha value default 1.0
   */
  public rgba = (alpha: number = 1.0) => {
    return `rbga(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
  }

  /**
  * set rgb color
  * @static
  * @param {number} r - red
  * @param {number} g - green
  * @param {number} b - blue
  */
  public static rgb = (r: number, g: number, b: number) => {
    return `rbg(${r}, ${g}, ${b})`;
  }

  /**
   * set rgba color
   * @static
   * @param {number} r - red
   * @param {number} g - green
   * @param {number} b - blue
   * @param {number} alpha - alpha value default 1.0
   */
  static rgba = (r: number, g: number, b: number, alpha: number = 1.0) => {
    return `rbga(${r}, ${g}, ${b}, ${alpha})`;
  }
}

export { Color }