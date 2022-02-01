/**
 * @class Vector2
 * @todo Translation from Japanese to English
 * @license MIT
 * @author HosodaMath
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
   * @description Vector copy
   * @method Vector2
   * @returns
   */
  copy = () => {
    return new Vector2(this.x, this.y);
  };

  set = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };

  /**
   * @description Vector addition
   * @method Vector2
   * @param v v is a vector.
   * @todo Implementing Static Methods -> x
   * @todo test -> x
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
   * @todo Implementing Static Methods -> x
   * @todo test -> x
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
   * @todo Implementing Static Methods -> x
   * @todo test
   */
  scalar_multi = (s: number) => {
    this.x = this.x * s;
    this.y = this.y * s;

    return this;
  };

  /**
   * @description Scalar Dived of a vectors
   * @method Vector2
   * @param s s is a scalar.
   * @todo Implementing Static Methods -> x
   * @todo test
   */
  scalar_div = (s: number) => {
    this.x = this.x / s;
    this.y = this.y / s;

    return this;
  };

  /**
   * @description Inner Product of a vectors
   * @method Vector2
   * @param v s is a Vector2.
   * @todo Implementing Static Methods
   * @todo test
   */
  dot = (v: Vector2) => {
    return this.x * v.x + this.y * v.y;
  };

  /**
   * @description Inverse Vector
   * @method Vector2
   * @todo Implementing Static Methods -> x
   * @todo test
   */
  negative = () => {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  };

  /**
   * @description Magnitude of the vector
   * @method Vector2
   * @todo Implementing Static Methods -> x
   * @todo test
   */
  magnitude = () => {
    const pow_x = Math.pow(this.x, 2);
    const pow_y = Math.pow(this.y, 2);
    const result = Math.sqrt(pow_x + pow_y);

    return result;
  };

  /**
   * @description Normalizing vectors
   * @method Vector2
   * @todo Implementing Static Methods
   * @todo test
   */
  normalize = () => {
    this.x = this.x / this.magnitude();
    this.y = this.y / this.magnitude();

    return this;
  };

  /**
   * @description vector equality
   * @method Vector2
   * @param v v is a vector.
   * @returns boolean
   * @todo Implementing Static Methods -> x
   * @todo test
   * @todo Review of implementation methods!! -> Change the method name to equal
   */
  equal = (v: Vector2) => {
    const result = this.x === v.x && this.y === v.y;

    return result;
  };

  /**
   * @description vector inequality
   * @method Vector2
   * @param v v is a vector.
   * @returns boolean
   * @todo Implementing Static Methods -> x
   * @todo test
   * @todo Review of implementation methods!! -> Change the method name to unequal
   */
  unequal = (v: Vector2) => {
    const result = this.x !== v.x && this.y !== v.y;

    return result;
  };

  // Here is the static method.

  /**
   * @description It outputs a zero vector.
   * @static Vector2
   * @returns Vector2
   * @todo test -> x
   */
  static zero = () => {
    const x = 0;
    const y = 0;

    return new Vector2(x, y);
  };

  /**
   * @description Vector addition
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns Vector2
   * @todo test -> x
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
   * @todo test  -> x
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
   * @todo test
   */
  static scalar_multi = (v: Vector2, s: number) => {
    const x = v.x * s;
    const y = v.y * s;

    return new Vector2(x, y);
  };

  /**
   * @description Scalar Dived of a vectors
   * @static Vector2
   * @param v v is a vector.
   * @param s s is a scalar.
   * @returns Vector2
   * @todo test
   */
  static scalar_div = (v: Vector2, s: number) => {
    const x = v.x / s;
    const y = v.y / s;

    return new Vector2(x, y);
  };

  /**
   * @description Inverse Vector
   * @static Vector2
   * @todo Implementing Static Methods
   * @todo test
   */
  static negative = (v: Vector2) => {
    const x = -v.x;
    const y = -v.y;

    return new Vector2(x, y);
  };

  /**
   * @description Find the magnitude of the vector
   * @param v v is a vector.
   * @returns number
   * @todo test
   */
  static magnitude = (v: Vector2) => {
    const pow_x = Math.pow(v.x, 2);
    const pow_y = Math.pow(v.y, 2);
    const result = Math.sqrt(pow_x + pow_y);

    return result;
  };

  /**
   * @description Normalizing vectors
   * @static Vector2
   * @param v v is a vector.
   * @returns Vector2
   */
  static normalize = (v: Vector2) => {
    const x = v.x / Vector2.magnitude(v);
    const y = v.y / Vector2.magnitude(v);

    return new Vector2(x, y);
  };

  /**
   * @description vector equality
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns boolean
   * @todo test
   * @todo Review of implementation methods!! -> Change the method name to equal
   */
  static equal = (v: Vector2, w: Vector2) => {
    const result = v.x === w.x && v.y === w.y;

    return result;
  };

  /**
   * @description vector inequality
   * @static Vector2
   * @param v v is a vector.
   * @param w w is a vector.
   * @returns boolean
   * @todo test
   * @todo Review of implementation methods!! -> Change the method name to unequal
   */
  static unequal = (v: Vector2, w: Vector2) => {
    const result = v.x !== w.x && v.y !== w.y;

    return result;
  };
}
