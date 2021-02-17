function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
}   

function draw() {
    orbitControl();
    background("#000000");
    translate(0, 0);
    //rotate(frameCount / 30.0);
    rotateX(frameCount / 30.0);
    rotateY(frameCount / 30.0);
    fill("#ffff00");
    box(100, 100, 100);
}