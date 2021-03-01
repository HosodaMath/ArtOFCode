function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
}

let drawTriangle = () => {
    push();

    strokeWeight(1.0);
    translate(0.0, 0.0, 0.0);
    //rotateY(- frameCount * 0.01);
    scale(100);

    beginShape(TRIANGLES);

    stroke(color(200, 250, 200, 200));
    fill(color(200, 200, 250, 200));
    vertex(- 1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 1.0, 1.0);

    stroke(color(200, 250, 200, 200));
    fill(color(250, 250, 50, 200));
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, - 1.0);

    stroke(color(250, 50, 50, 200));
    fill(color(250, 50, 50, 200));
    vertex(0.0, 1.0, - 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(- 1.0, 1.0, 1.0);

    stroke(color(200, 250, 200, 200));
    fill(color(50, 50, 250, 200));
    vertex(- 1.0, 1.0, 1.0);
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 1.0, - 1.0);

    endShape(CLOSE);

    pop();
}

function draw() {
    orbitControl();
    background(0, 0, 0);

    drawTriangle();
}