export class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add = (v: Vector3) => {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    this.z = this.z + v.z;

    return this;
  };

  sub = (v: Vector3) => {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    this.z = this.z - v.z;

    return this;
  };

  scalar_multi = (s: number) => {
    this.x = this.x * s;
    this.y = this.y * s;
    this.z = this.z * s;

    return this;
  };

  scalar_div = (s: number) => {
    this.x = this.x / s;
    this.y = this.y / s;
    this.z = this.z / s;

    return this;
  };

  /**
   * @description Inner Product of a vectors
   * @method Vector3
   * @param v s is a Vector3.
   * @todo Implementing Static Methods
   * @todo test
   */
  dot2 = (v: Vector3) => {
    return this.x * v.x + this.y * v.y;
  };

  /**
   * @description Inner Product of a vectors
   * @method Vector3
   * @param v s is a Vector3.
   * @todo Implementing Static Methods
   * @todo test
   */
  dot = (v: Vector3) => {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  };

  magnitude = () => {
    const result = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z
    );

    return result;
  };

  normalize = () => {
    this.x = this.x / this.magnitude();
    this.y = this.y / this.magnitude();
    this.z = this.z / this.magnitude();

    return this;
  };

  // Here is the static method.

  static add = (v: Vector3, w: Vector3) => {
    const x = v.x + w.x;
    const y = v.y + w.y;
    const z = v.z + w.z;

    return new Vector3(x, y, z);
  };

  static sub = (v: Vector3, w: Vector3) => {
    const x = v.x - w.x;
    const y = v.y - w.y;
    const z = v.z - w.z;

    return new Vector3(x, y, z);
  };

  static scalar_multi = (v: Vector3, s: number) => {
    const x = v.x * s;
    const y = v.y * s;
    const z = v.z * s;

    return new Vector3(x, z, y);
  };

  static scalar_div = (v: Vector3, s: number) => {
    const x = v.x / s;
    const y = v.y / s;
    const z = v.z / s;

    return new Vector3(x, z, y);
  };

  static magnitude = (v: Vector3) => {
    const result = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

    return result;
  };

  static normalize = (v: Vector3) => {
    const x = v.x / Vector3.magnitude(v);
    const y = v.y / Vector3.magnitude(v);
    const z = v.z / Vector3.magnitude(v);

    return new Vector3(x, y, z);
  };
}
