/**
 *
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class BezierCurve {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Point[]} data
     */
    constructor(gl, data) {
        this.data = [];
        this.gl = gl;
        this.data = data;
    }
}
export {};
