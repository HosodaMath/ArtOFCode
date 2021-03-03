import { Vector2 } from "../mathematics/vector.js";
class Rectangle {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Vector2} init_position
     * @param {Vector2} init_rect_size
     */
    constructor(gl, init_position, init_rect_size) {
        this.position = new Vector2(0, 0);
        this.rect_size = new Vector2(0, 0);
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
            this.gl.rect(this.position.x, this.position.y, this.rect_size.x, this.rect_size.y);
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
            this.gl.rect(this.position.x, this.position.y, this.rect_size.x, this.rect_size.y);
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
            this.gl.rect(this.position.x, this.position.y, this.rect_size.x, this.rect_size.y);
            this.gl.stroke();
        };
        this.gl = gl;
        this.position = init_position;
        this.rect_size = init_rect_size;
    }
}
export { Rectangle };
