export class Vector4 {
  static create() {
    return new Float32Array(4);
  }

  static set(x: number, y: number, z: number, w: number) {
    const out = this.create();
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;

    return out;
  }
}
