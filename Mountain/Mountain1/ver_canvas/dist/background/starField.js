/**
 * 星の世界を描くクラス
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class StarField {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Vector2[]} star_location
     * @param {number[]} star_radius
     */
    constructor(gl, star_location, star_radius) {
        this.star_location = [];
        this.srat_radius = [];
        /**
         * 円の形をしている星を描く
         * @method
         * @param {string[]} colors
         */
        this.drawStarField = (colors) => {
            for (let count = 0; count < colors.length; count++) {
                this.gl.beginPath();
                this.gl.fillStyle = colors[count];
                this.gl.shadowBlur = 10;
                this.gl.shadowColor = colors[count];
                this.gl.arc(this.star_location[count].x, this.star_location[count].y, this.srat_radius[count], 0, 2 * Math.PI);
                this.gl.closePath();
                this.gl.fill();
            }
        };
        this.gl = gl;
        this.star_location = star_location;
        this.srat_radius = star_radius;
    }
}
export { StarField };
