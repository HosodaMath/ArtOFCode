let sides = 3;
let angle, px, py;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

}

function draw() {
    background(0, 230, 100);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    ngon(sides, 0, 0, 512);
}


function ngon(n, x, y, d) {
    //TESSは真ん中に穴を開ける
    beginShape();
    for (let i = 0; i < n + 1; i++) {
        angle = TWO_PI / n * i;
        px = x + sin(angle) * d / 2;
        py = y - cos(angle) * d / 2;
        vertex(px, py, 0);
    }
    endShape(CLOSE);
}