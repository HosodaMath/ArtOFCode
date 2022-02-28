/**
 * @class Vector2
 * @author Shingo Hosoda
 */
export class Vector2 {
  public x: number;
  public y: number;
  /**
   * @constructor
   * @param x the x component of the vector
   * @param y the y component of the vector
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * @method Vector2
   * @param x the x component of the number
   * @param y the y component of the number
   * @returns
   */
  set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  add(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param w the w component of the vector
   * @returns
   */
  static add(v: Vector2, w: Vector2): Vector2 {
    const x = v.x + w.x;
    const y = v.y + w.y;

    return new Vector2(x, y);
  }

  /**
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  sub(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param w the w component of the vector
   * @returns
   */
  static sub(v: Vector2, w: Vector2): Vector2 {
    const x = v.x - w.x;
    const y = v.y - w.y;

    return new Vector2(x, y);
  }

  /**
   * @method Vector2
   * @param s the v component of the number
   * @returns
   */
  mult(s: number): Vector2 {
    this.x *= s;
    this.y *= s;

    return this;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param s the v component of the number
   * @returns
   */
  static mult(v: Vector2, s: number): Vector2 {
    const x = v.x * s;
    const y = v.y * s;

    return new Vector2(x, y);
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  multVec(v: Vector2): Vector2 {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param w the w component of the vector
   * @returns
   */
  static multVec(v: Vector2, w: Vector2): Vector2 {
    const x = v.x * w.x;
    const y = v.y * w.y;

    return new Vector2(x, y);
  }

  /**
   * @method Vector2
   * @param s the s component of the number
   * @returns
   */
  div(s: number): Vector2 {
    this.x /= s;
    this.y /= s;

    return this;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param s the s component of the number
   * @returns
   */
  static div(v: Vector2, s: number): Vector2 {
    const x = v.x / s;
    const y = v.y / s;

    return new Vector2(x, y);
  }

  /**
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  divVec(v: Vector2): Vector2 {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param w the v component of the vector
   * @returns
   */
  static divVec(v: Vector2, w: Vector2): Vector2 {
    const x = v.x / w.x;
    const y = v.y / w.y;

    return new Vector2(x, y);
  }

  /**
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param w the w component of the vector
   * @returns
   */
  static dot(v: Vector2, w: Vector2): number {
    return v.x * w.x + v.y * w.y;
  }

  /**
   * @method
   * @param v the v component of the vector
   * @returns
   */
  cross(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @param w the w component of the vector
   * @returns
   */
  static cross(v: Vector2, w: Vector2): number {
    return v.x * w.y - v.y * w.x;
  }

  /**
   * @method Vector2
   * @returns
   */
  sqMagnitude(): number {
    return this.x * this.y;
  }

  /**
   * @method Vector2
   * @returns
   */
  magnitude(): number {
    return Math.sqrt(this.sqMagnitude());
  }

  /**
   * @method Vector2
   * @returns
   */
  normalize(): Vector2 {
    const len = this.magnitude();

    if (len !== 0) {
      const e = 1.0 / len;

      return this.mult(e);
    } else {
      const e = Vector2.zero();

      return e;
    }
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  static normalize(v: Vector2): Vector2 {
    const mag = v.magnitude();

    return Vector2.div(v, mag);
  }

  /**
   * @static
   * @method Vector2
   * @param v the v component of the vector
   * @returns
   */
  static inverse(v: Vector2): Vector2 {
    return Vector2.mult(v, -1);
  }

  /**
   * @static
   * @method Vector2
   * @returns
   */
  static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  /**
   * @method Vector2
   * @returns
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * @method Vector2
   * @returns
   */
  toArray(): [number, number] {
    return [this.x, this.y];
  }

  /**
   * @method Vector2
   * @returns
   */
  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }
}
