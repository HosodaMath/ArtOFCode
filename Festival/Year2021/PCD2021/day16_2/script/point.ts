class Point {
  private x: number = 0;
  private y: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get location_x() {
    return this.x;
  }

  get location_y() {
    return this.y;
  }
}

export {Point};