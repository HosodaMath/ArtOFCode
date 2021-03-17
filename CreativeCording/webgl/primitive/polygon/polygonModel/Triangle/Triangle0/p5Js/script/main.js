function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
}

let drawTriangle1FIllStroke = () => {
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

let drawTriangle2NormalMaterial = () => {
    push();

    noStroke();
    translate(0.0, 0.0, 0.0);
    scale(100);

    normalMaterial();

    beginShape(TRIANGLES);
    vertex(- 1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 1.0, 1.0);

    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, - 1.0);

    vertex(0.0, 1.0, - 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(- 1.0, 1.0, 1.0);

    vertex(- 1.0, 1.0, 1.0);
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 1.0, - 1.0);
    endShape(CLOSE);

    pop();
}

let drawTriangle2Material1 = () => {
    push();
    ambientMaterial(100, 200, 100);
    ambientLight(100, 200, 100)
    noStroke();
    translate(0.0, 0.0, 0.0);
    scale(100);

    beginShape(TRIANGLES);
    vertex(- 1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 1.0, 1.0);

    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, - 1.0);

    vertex(0.0, 1.0, - 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(- 1.0, 1.0, 1.0);

    vertex(- 1.0, 1.0, 1.0);
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 1.0, - 1.0);
    endShape(CLOSE);

    pop();
}

let drawTriangle2Material2 = () => {
    push();

    noStroke();
    translate(0.0, 0.0, 0.0);
    scale(100);


    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    console.log(-dirX, -dirY);
    directionalLight(200, 250, 200, -dirX, -dirY, -1);
    ambientMaterial(200, 255, 200);

    beginShape(TRIANGLES);
    vertex(- 1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(1.0, 1.0, 1.0);

    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(0.0, 1.0, - 1.0);

    vertex(0.0, 1.0, - 1.0);
    vertex(0.0, 0.0, 0.0);
    vertex(- 1.0, 1.0, 1.0);

    vertex(- 1.0, 1.0, 1.0);
    vertex(1.0, 1.0, 1.0);
    vertex(0.0, 1.0, - 1.0);
    endShape(CLOSE);

    pop();
}

function draw() {
    orbitControl();
    background(0, 0, 0);

    //drawTriangle1FIllStroke();
    //drawTriangle2NormalMaterial();
    //drawTriangle2Material1();
    drawTriangle2Material2();
}