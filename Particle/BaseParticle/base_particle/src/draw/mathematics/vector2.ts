/**
 * @class
 * Vector2
 * @description
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
 class Vector2 {
  public x: number = 0;
  public y: number = 0;
  /**
   *
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * get x coordinate
   * @method get
   * @example
   *
   */
  get width() {
    return this.x;
  }

  /**
   * get y coordinate
   * @method get
   * @example
   *
   */
  get height() {
    return this.y;
  }

  /**
   * setter
   * @method set
   * @param x
   * @param y
   */
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * @method add
   * @param {Vector2} value - value the vector to add
   */
  add = (value: Vector2) => {
    this.x = this.x + value.x;
    this.y = this.y + value.y;
    return this;
  };

  /**
   * @method sub
   * @param {Vector2} value - value the vector to sub
   */
  sub = (value: Vector2) => {
    this.x = this.x - value.x;
    this.y = this.y - value.y;
    return this;
  };

  /**
   * @method multi
   * @param {number} value - value the vector to multi
   */
  multi = (value: number) => {
    this.x = this.x * value;
    this.y = this.y * value;
    return this;
  };

  /**
   * @method div
   * @param {number} value - value the vector to div
   */
  div = (value: number) => {
    this.x = this.x / value;
    this.y = this.y / value;
    return this;
  };

  //static methods

  /**
   * @static
   * @method add
   * @param {Vector2} value1 - value1 the vector to add
   * @param {Vector2} value2 - value2 the vector to add
   */
  static add = (value1: Vector2, value2: Vector2) => {
    return new Vector2(value1.x + value2.x, value1.y + value2.y);
  };

  /**
   * @static
   * @method sub
   * @param {Vector2} value1 - value1 the vector to sub
   * @param {Vector2} value2 - value2 the vector to sub
   */
  static sub = (value1: Vector2, value2: Vector2) => {
    return new Vector2(value1.x - value2.x, value1.y - value2.y);
  };

  /**
   * @static
   * @method multi
   * @param {Vector2} value1 - value1 the vector to sub
   * @param {number} value2 - value2 the scalar to sub
   */
  static multi = (value1: Vector2, value2: number) => {
    return new Vector2(value1.x * value2, value1.y * value2);
  };

  /**
   * @static
   * @method div
   * @param {Vector2} value1 - value1 the vector to sub
   * @param {number} value2 - value2 the scalar to sub
   */
  static div = (value1: Vector2, value2: number) => {
    return new Vector2(value1.x / value2, value1.y / value2);
  };
}

export { Vector2 };
