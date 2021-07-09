class Point {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
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
export { Point };
