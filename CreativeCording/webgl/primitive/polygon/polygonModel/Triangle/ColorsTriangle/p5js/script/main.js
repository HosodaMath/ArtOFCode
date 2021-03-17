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

    drawTriangle(){
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

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
}


function draw() {
    background(0, 0, 0);
}