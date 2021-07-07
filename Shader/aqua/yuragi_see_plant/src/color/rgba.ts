export class RGBA {
  public r: number;
  public g: number;
  public b: number;
  public a: number;
  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  cssRGBA = () => {
    const col = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;

    return col;
  };
}
