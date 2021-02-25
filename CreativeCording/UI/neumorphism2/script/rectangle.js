class Rectangle {
    /**
     * 
     * @param {p5.Vector} location 
     * @param {p5.Vector} size 
     */
    constructor(location, size) {
        this.location = location;
        this.size = size
    }

    /**
     * 
     * @param {number | string} fillColor or color(p5Js)
     * @param {p5.Vector} boderRadius 
     */
    drawRect1 = (fillColor, boderRadius = createVector(0, 0)) => {
        fill(fillColor);
        rect(this.location.x, this.location.y, this.size.x, this.size.y, boderRadius.x, boderRadius.y);
    }

}