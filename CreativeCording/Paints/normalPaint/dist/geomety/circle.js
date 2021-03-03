import { Vector2 } from "../mathematics/vector.js";
class Circle {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Vector2} init_position
     * @param {number} init_circle_radius
     */
    constructor(gl, init_position, init_circle_radius) {
        this.position = new Vector2(0, 0);
        this.radius = 0;
        /**
         *
         * @param {string} fill
         * @param {string} stroke
         * @param {number} stroke_weight
         * @param {number} alpha
         */
        this.draw = (fill, stroke, stroke_weight = 1.0, alpha = 1.0) => {
            this.gl.globalAlpha = alpha;
            this.gl.fillStyle = fill;
            this.gl.strokeStyle = stroke;
            this.gl.lineWidth = stroke_weight;
            this.gl.beginPath();
            this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            this.gl.closePath();
            this.gl.fill();
            this.gl.stroke();
        };
        /**
         * fillのみ描画
         * @param {string} fill
         * @param {number} alpha
         */
        this.draw_fill = (fill, alpha = 1.0) => {
            this.gl.globalAlpha = alpha;
            this.gl.fillStyle = fill;
            this.gl.beginPath();
            this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            this.gl.closePath();
            this.gl.fill();
        };
        /**
         * strokeのみ描画
         * @param stroke
         * @param stroke_weight
         * @param alpha
         */
        this.draw_stroke = (stroke, stroke_weight = 1.0, alpha = 1.0) => {
            this.gl.globalAlpha = alpha;
            this.gl.strokeStyle = stroke;
            this.gl.lineWidth = stroke_weight;
            this.gl.beginPath();
            this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            this.gl.closePath();
            this.gl.stroke();
        };
        this.gl = gl;
        this.position = init_position;
        this.radius = init_circle_radius;
    }
}
export { Circle };
