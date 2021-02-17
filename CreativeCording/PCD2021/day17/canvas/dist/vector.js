/**
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Vector2 {
    /**
     *
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     */
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        /**
         * @method add
         * @param {Vector2} value - value the vector to add
         */
        this.add = (value) => {
            this.x = this.x + value.x;
            this.y = this.y + value.y;
            return new Vector2(this.x, this.y);
        };
        /**
         * @method sub
         * @param {Vector2} value - value the vector to sub
         */
        this.sub = (value) => {
            this.x = this.x - value.x;
            this.y = this.y - value.y;
            return new Vector2(this.x, this.y);
        };
        /**
         * @method multi
         * @param {number} value - value the vector to multi
         */
        this.multi = (value) => {
            this.x = this.x * value;
            this.y = this.y * value;
            return new Vector2(this.x, this.y);
        };
        /**
         * @method div
         * @param {number} value - value the vector to div
         */
        this.div = (value) => {
            this.x = this.x / value;
            this.y = this.y / value;
            return new Vector2(this.x, this.y);
        };
        this.x = x;
        this.y = y;
    }
    /**
     * get x coordinate
     * @method get
     * @example
     *
     */
    get coord_x() {
        return this.x;
    }
    /**
     * get y coordinate
     * @method get
     * @example
     *
     */
    get coord_y() {
        return this.y;
    }
}
//static methods
/**
* @static
* @method add
* @param {Vector2} value1 - value1 the vector to add
* @param {Vector2} value2 - value2 the vector to add
*/
Vector2.add = (value1, value2) => {
    return new Vector2(value1.x + value2.x, value1.y + value2.y);
};
/**
* @static
* @method sub
* @param {Vector2} value1 - value1 the vector to sub
* @param {Vector2} value2 - value2 the vector to sub
*/
Vector2.sub = (value1, value2) => {
    return new Vector2(value1.x - value2.x, value1.y - value2.y);
};
/**
* @static
* @method multi
* @param {Vector2} value1 - value1 the vector to sub
* @param {number} value2 - value2 the scalar to sub
*/
Vector2.multi = (value1, value2) => {
    return new Vector2(value1.x * value2, value1.y * value2);
};
/**
* @static
* @method div
* @param {Vector2} value1 - value1 the vector to sub
* @param {number} value2 - value2 the scalar to sub
*/
Vector2.div = (value1, value2) => {
    return new Vector2(value1.x / value2, value1.y / value2);
};
export { Vector2 };
