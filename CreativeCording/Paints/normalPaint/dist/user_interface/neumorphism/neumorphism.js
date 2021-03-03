import { Vector2 } from "../../mathematics/vector.js";
import { Rectangle } from "../../geomety/rectangle.js";
import { Ellipse } from "../../geomety/ellipse.js";
/**
 * @class SetVector
 * @description
 * Vector2をVector2配列に変換するクラス
 * @example
 *
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 * @license MIT
 */
class Neumorphism {
    constructor(gl, position, size) {
        this.position = new Vector2(0, 0);
        this.size = new Vector2(0, 0);
        this.gl = gl;
        this.position = position;
        this.size = size;
    }
    draw_rect(fillColor, shaow) {
        this.gl.shadowColor = shaow.shadow_color.shadow_color1;
        this.gl.shadowBlur = shaow.shadow_blur;
        this.gl.shadowOffsetX = shaow.shadow_offset.shadow_offset_x;
        this.gl.shadowOffsetY = shaow.shadow_offset.shadow_offset_y;
        let render_rect1 = new Rectangle(this.gl, this.position, this.size);
        render_rect1.draw_fill(fillColor);
        this.gl.shadowColor = shaow.shadow_color.shadow_color2;
        this.gl.shadowBlur = shaow.shadow_blur;
        this.gl.shadowOffsetX = -1 * shaow.shadow_offset.shadow_offset_x;
        this.gl.shadowOffsetY = -1 * shaow.shadow_offset.shadow_offset_y;
        let render_rect2 = new Rectangle(this.gl, this.position, this.size);
        render_rect2.draw_fill(fillColor);
    }
    draw_ellipse(fillColor, shaow) {
        this.gl.shadowColor = shaow.shadow_color.shadow_color1;
        this.gl.shadowBlur = shaow.shadow_blur;
        this.gl.shadowOffsetX = shaow.shadow_offset.shadow_offset_x;
        this.gl.shadowOffsetY = shaow.shadow_offset.shadow_offset_y;
        let render_ellipse1 = new Ellipse(this.gl, this.position, this.size);
        render_ellipse1.draw_fill(fillColor);
        this.gl.shadowColor = shaow.shadow_color.shadow_color2;
        this.gl.shadowBlur = shaow.shadow_blur;
        this.gl.shadowOffsetX = -1 * shaow.shadow_offset.shadow_offset_x;
        this.gl.shadowOffsetY = -1 * shaow.shadow_offset.shadow_offset_y;
        let render_ellipse2 = new Ellipse(this.gl, this.position, this.size);
        render_ellipse2.draw_fill(fillColor);
    }
}
export { Neumorphism };
