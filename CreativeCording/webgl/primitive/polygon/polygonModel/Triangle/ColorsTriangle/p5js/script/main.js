class Triangle {
    constructor(location1, velocity1, size1) {
        this.location1 = location1;
        this.velocity1 = velocity1;
        this.size1 = size1;
    }

    drawStep() {
        this.location1.add(this.velocity1);

        if (this.location1 > height / 2.0) {
            this.location1 = -height / 2.0;
        }
    }

    drawTriangle() {
        push();
        scale(50);
        beginShape(TRIANGLES);
        fill("#00ff00");
        vertex(-1, 1, 0);
        fill("#0000ff");
        vertex(1, 1, 0);
        fill("#00ffff");
        vertex(0, -1, 0);
        endShape();
        pop();
    }
}

let location1 = [];
let velocity1 = [];
let size1 = [];
const MAX = 10;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
}

let setTriangle = () => {
    let depth = width;
    for (let count = 0; count < MAX; count++) {
        location1[count] = createVector(
            random(-width / 2.0, width / 2.0),
            random(-height / 2.0, height / 2.0),
            random(0, random(0, depth / 2.0))
        );

        velocity1[count] = createVector(
            0, random(1, 2), 0
        );

        size[count] = random(50, 100);
    }
}



function draw() {
    background(0, 0, 0);
}