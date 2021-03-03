class Polygon {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Point[]} data
     */
    constructor(gl, data) {
        this.data = [];
        /**
         * パスは閉じない
         * @param {string | CanvasGradient} stroke - 縁の色(線の色)
         * @param {number} stroke_weight -縁の太さ(線の太さ) デフォルトでは1.0
         */
        this.drawPolygon1 = (stroke, stroke_weight = 1.0) => {
            this.gl.strokeStyle = stroke;
            this.gl.lineWidth = stroke_weight;
            this.gl.beginPath();
            this.gl.moveTo(this.data[0].location_x, this.data[0].location_y);
            for (let count = 1; count < this.data.length; count++) {
                this.gl.lineTo(this.data[count].location_x, this.data[count].location_y);
            }
            this.gl.stroke();
        };
        /**
         * パスを閉じる
         * @param {string | CanvasGradient} fill - 塗りつぶしの色
         */
        this.drawPolygon2 = (fill, fill_alpha = 1.0) => {
            this.gl.fillStyle = fill;
            this.gl.globalAlpha = fill_alpha;
            this.gl.beginPath();
            this.gl.moveTo(this.data[0].location_x, this.data[0].location_y);
            for (let count = 1; count < this.data.length; count++) {
                this.gl.lineTo(this.data[count].location_x, this.data[count].location_y);
            }
            this.gl.closePath();
            this.gl.fill();
        };
        this.gl = gl;
        this.data = data;
    }
}
export { Polygon };
