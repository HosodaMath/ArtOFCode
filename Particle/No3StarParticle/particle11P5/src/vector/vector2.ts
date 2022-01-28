/**
 * @description
 * @class Vector2
 * @todo Translation from Japanese to English
 * @license MIT
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
export class Vector2 {
  public x: number;
  public y: number;
  /**
   * @description constructor
   * @constructor Vector2
   * @param x x is a component of a vector.
   * @param y y is a component of a vector.
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @description Vector addition
   * @method Vector2
   * @param v v is a vector.
   */
  add = (v: Vector2) => {
    this.x = this.x + v.x;
    this.y = this.y + v.y;

    return this;
  };

  /**
   * @description Subtraction of vectors
   * @method Vector2
   * @param v v is a vector.
   */
  sub = (v: Vector2) => {
    this.x = this.x - v.x;
    this.y = this.y - v.y;

    return this;
  };

  /**
   * @description Scalar Multiplication of a vectors
   * @method Vector2
   * @param s s is a scalar.
   */
  scalar_multi = (s: number) => {
    this.x = this.x * s;
    this.y = this.y * s;

    return this;
  };

  /**
   * @description vector equality
   * @method Vector2
   * @param v v is a vector.
   * @returns boolean
   */
  equality = (v: Vector2) => {
    const result = this.x === v.x && this.y === v.y;

    return result;
  };

  /**
   * @description vector inequality
   * @method Vector2
   * @param v v is a vector.
   * @returns boolean
   */
  inequality = (v: Vector2) => {
    const result = this.x !== v.x && this.y !== v.y;

    return result;
  };

  // Here is the static method.

  /**
   * @description It outputs a zero vector.
   * @static Vector2
   * @returns Vector2
   */
  static zero = () => {
    const x = 0;
    const y = 0;

    return new Vector2(x, y);
  };

  /**
   * @description It outputs one vector.
   * @static Vector2
   * @returns Vector2
   */
  static one = () => {
    const x = 1;
    const y = 1;

    return new Vector2(x, y);
  };

  /**
   * @description Vector addition
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns Vector2
   */
  static add = (v: Vector2, w: Vector2) => {
    const x = v.x + w.x;
    const y = v.y + w.y;

    return new Vector2(x, y);
  };

  /**
   * @description Subtraction of vectors
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns Vector2
   */
  static sub = (v: Vector2, w: Vector2) => {
    const x = v.x - w.x;
    const y = v.y - w.y;

    return new Vector2(x, y);
  };

  /**
   * @description Scalar Multiplication of a vectors
   * @static Vector2
   * @param v v is a vector.
   * @param s s is a scalar.
   * @returns Vector2
   */
  static scalar_multi = (v: Vector2, s: number) => {
    const x = v.x * s;
    const y = v.y * s;

    return new Vector2(x, y);
  };

  /**
   * @description vector equality
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns boolean
   */
  static equality = (v: Vector2, w: Vector2) => {
    const result = v.x === w.x && v.y === w.y;

    return result;
  };

  /**
   * @description vector inequality
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns boolean
   */
  static inequality = (v: Vector2, w: Vector2) => {
    const result = v.x !== w.x && v.y !== w.y;

    return result;
  };
}
