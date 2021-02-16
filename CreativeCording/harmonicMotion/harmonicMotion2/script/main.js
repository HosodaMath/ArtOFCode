let angle = 0;
let angleV = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
}

function draw() {
    translate(width / 2, height / 2);
    background(0, 0, 0);
    fill(255, 230, 20);
    let x = map(cos(angle), -1, 1, -200, 200);
    let y = map(sin(angle), -1, 1, -200, 200);
    strokeWeight(5);
    stroke(255);
    line(0, 0, x, y);
    line(x, height, x, y);
    circle(x, y, 100);

    angle += angleV;
    angleV += 0.0001;
    console.log(frameRate());
}