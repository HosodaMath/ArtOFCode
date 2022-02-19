/**
 * @class Vector3
 * @author HosodaMath
 */
 export class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  /**
   * @constructor
   * @param x - The x component of the vector
   * @param y - The y component of the vector
   * @param z - The z component of the vector
   */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * @method toString
   * @description ベクトルの要素を文字列で出力
   * @returns
   */
  public toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  /**
   * @method set
   * @description
   * @param x - The x component of the vector
   * @param y - The y component of the vector
   * @param z - The z component of the vector
   * @returns
   */
  public set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;

    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * @method copy
   * @description ベクトルをコピー
   * @returns
   */
  public copy(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * @method add
   * @param v
   * @returns
   */
  public add(v: Vector3): this {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  /**
   * @method mult
   * @param s
   * @returns
   */
  public mult(s: number): this {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
  }

  /**
   * @method div
   * @param s
   * @returns
   */
  public div(s: number): this {
    this.x /= s;
    this.y /= s;
    this.z /= s;

    return this;
  }

  /**
   * @static
   * @method add
   * @param v
   * @param w
   * @returns
   */
  public static add(v: Vector3, w: Vector3): Vector3 {
    return new Vector3(v.x + w.x, v.y + w.y, v.z + w.z);
  }

  /**
   * @static
   * @method mult
   * @param v
   * @param s
   * @returns
   */
  public static mult(v: Vector3, s: number): Vector3 {
    return new Vector3(v.x * s, v.y * s, v.z * s);
  }

  /**
   * @static
   * @method div
   * @param v
   * @param s
   * @returns
   */
  public static div(v: Vector3, s: number): Vector3 {
    return new Vector3(v.x / s, v.y / s, v.z / s);
  }
}
