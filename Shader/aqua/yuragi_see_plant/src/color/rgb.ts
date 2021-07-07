export class RGB {
  public r: number;
  public g: number;
  public b: number;
  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  cssRGB = () => {
    const col = `rgb(${this.r}, ${this.g}, ${this.b})`;

    return col;
  };
}
