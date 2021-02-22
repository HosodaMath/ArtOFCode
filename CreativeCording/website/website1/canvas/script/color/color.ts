class Color {
  /**
   * set rgb color
   * @param {number} r - red
   * @param {number} g - green
   * @param {number} b - blue
   */
  static rgb = (r: number, g: number, b: number) => {
    return `rbg(${r}, ${g}, ${b})`;
  }

  /**
   * set rgba color
   * @param {number} r - red
   * @param {number} g - green
   * @param {number} b - blue
   * @param {number} alpha - alpha value default 1.0
   */
  static rgba = (r: number, g: number, b: number, alpha: number = 1.0) => {
    return `rbga(${r}, ${g}, ${b}, ${alpha})`;
  }
}

export {Color};