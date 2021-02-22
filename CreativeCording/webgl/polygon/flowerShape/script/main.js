let sides = 3;
let angle, px, py;

class Flower {
    constructor(location, size, k) {
        this.location = location;
        this.size = size;
        this.k = k;
    }

    drawFlower = (colors) => {
        push();
        fill(colors);
        noStroke();
        translate(this.location.x, this.location.y, this.location.z);
        beginShape();
        for(let count = 0; count < Math.PI * 4.0; count += 0.01){
            let x = cos(this.k * count) * cos(count) * this.size;
            let y = cos(this.k * count) * sin(count) * this.size;
            vertex(x, y, 0);
        }
        endShape(CLOSE);
        pop();
    }
}


let flower;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    let location = createVector(0, 0, 0);
    let size = 256;
    let k = 4;
    flower = new Flower(location, size, k);

}

function draw() {
    background(0, 230, 100);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    flower.drawFlower(color(0200, 200, 0));
}