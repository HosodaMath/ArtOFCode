class Color {
    /**
     * set color
     * @param {number} r - red
     * @param {number} g - green
     * @param {number} b - blue
     */
    constructor(r, g, b) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        /**
         * @method
         */
        this.rgb = () => {
            return `rbg(${this.r}, ${this.g}, ${this.b})`;
        };
        /**
         * @method
         * @param {number} alpha - alpha value default 1.0
         */
        this.rgba = (alpha = 1.0) => {
            return `rbga(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
        };
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
/**
* set rgb color
* @static
* @param {number} r - red
* @param {number} g - green
* @param {number} b - blue
*/
Color.rgb = (r, g, b) => {
    return `rbg(${r}, ${g}, ${b})`;
};
/**
 * set rgba color
 * @static
 * @param {number} r - red
 * @param {number} g - green
 * @param {number} b - blue
 * @param {number} alpha - alpha value default 1.0
 */
Color.rgba = (r, g, b, alpha = 1.0) => {
    return `rbga(${r}, ${g}, ${b}, ${alpha})`;
};
export { Color };
