import { Vector2 } from "../mathematics/vector.js";
/**
 * 月の世界を描くクラス
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Moon {
    /**
     * @param {CanvasRenderingContext2D}
     * @param {Vector2} moon_location - 月の座標
     * @param {Vector2} moon_radius  - 月の大きさ
     */
    constructor(gl, moon_location, moon_radius) {
        this.moon_location = new Vector2(0, 0);
        this.moon_radius = 0;
        this.drawMoon = (fill_color) => {
            this.gl.beginPath();
            this.gl.fillStyle = fill_color;
            this.gl.shadowBlur = 10;
            this.gl.shadowColor = fill_color;
            this.gl.arc(this.moon_location.x, this.moon_location.y, this.moon_radius, 0, 2 * Math.PI);
            this.gl.closePath();
            this.gl.fill();
        };
        this.gl = gl;
        this.moon_location = moon_location;
        this.moon_radius = moon_radius;
    }
}
export { Moon };
