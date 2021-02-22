function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
}

function draw() {
    orbitControl();
    background("#000000");
    
    push();
    translate(-width / 4, 0);
    rotateX(frameCount /  60.0);
    rotateY(frameCount /  60.0);
    fill("#00ffff");
    box(100, 100, 100);
    pop();
    
    push();
    translate(0, 0);
    rotateX(frameCount /  60.0);
    rotateY(frameCount /  60.0);
    fill("#00ffff");
    sphere(100);
    pop();

    push();
    translate(width / 4, 0);
    rotateX(frameCount / 60.0);
    rotateY(frameCount / 60.0);
    fill("#00ffff");
    ellipsoid(150, 100, 100);
    pop();
}