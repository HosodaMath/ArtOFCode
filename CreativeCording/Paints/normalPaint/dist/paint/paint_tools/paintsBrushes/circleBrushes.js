import { Vector2 } from "../../../mathematics/vector.js";
/**
 * TODO
 * ぶつかったら方向を変えるようにしたい
 * ぶつかったら色を変えるようにしたい
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 */
class BrushesCircle {
    constructor(gl, coordinate, radius, velocity) {
        this.coordinate = new Vector2(0, 0);
        this.radius = 0;
        this.velocity = new Vector2(0, 0);
        this.gl = gl;
        this.coordinate = coordinate;
        this.radius = radius;
        this.velocity = velocity;
    }
    paint_step(window_size) {
        this.coordinate.add(this.velocity);
        if (this.coordinate.x < 0 || this.coordinate.x > window_size.x) {
            this.velocity.x *= -1;
        }
        if (this.coordinate.y < 0 || this.coordinate.y > window_size.y) {
            this.velocity.y *= -1;
        }
    }
    paints_draw(fillColor) {
        this.gl.fillStyle = fillColor;
        this.gl.beginPath();
        this.gl.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
        this.gl.closePath();
        this.gl.fill();
    }
    paints_stroke_draw(strokeColor, stroke_weight = 1.0) {
        this.gl.strokeStyle = strokeColor;
        this.gl.lineWidth = stroke_weight;
        this.gl.beginPath();
        this.gl.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
        this.gl.closePath();
        this.gl.stroke();
    }
    paints_all_draw(fillColor, strokeColor, stroke_weight = 1.0) {
        this.gl.fillStyle = fillColor;
        this.gl.strokeStyle = strokeColor;
        this.gl.lineWidth = stroke_weight;
        this.gl.beginPath();
        this.gl.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
        this.gl.closePath();
        this.gl.fill();
        this.gl.stroke();
    }
}
export { BrushesCircle };
