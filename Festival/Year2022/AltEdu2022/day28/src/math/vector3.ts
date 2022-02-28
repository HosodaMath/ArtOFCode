export class Vector3 {
  static create() {
    return new Float32Array(3);
  }

  static set(x: number, y: number, z: number) {
    const out = this.create();
    out[0] = x;
    out[1] = y;
    out[2] = z;

    return out;
  }
}
