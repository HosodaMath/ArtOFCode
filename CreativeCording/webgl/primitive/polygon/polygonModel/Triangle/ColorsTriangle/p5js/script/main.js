let location1 = [];
let velocity1 = [];
let size1 = [];
let time;
const MAX = 30;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    setTriangle();

    time = 0;
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

        size1[count] = random(50, 100);
    }
}


let renderTriangle = () => {
    for (let count = 0; count < MAX; count++) {
        let triangle = new Triangle(location1[count], velocity1[count], size1[count]);
        triangle.drawStep();
        triangle.drawTriangle();
    }
}

function draw() {
    background(0, 0, 0);
    time += 0.01;
    push();
    rotateX(time);
    scale(cos(time) * 2);
    renderTriangle();
    pop();
}

class Triangle {
    constructor(location1, velocity1, size1) {
        this.location1 = location1;
        this.velocity1 = velocity1;
        this.size1 = size1;
    }

    drawStep() {
        this.location1.add(this.velocity1);

        if (this.location1.y > height / 2.0) {
            this.location1.y = -height / 2.0;
        }
    }

    drawTriangle() {
        push();
        translate(this.location1.x, this.location1.y, this.location1.z);
        scale(this.size1);
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