let angles = [];
let angleV = [];
let r = 16.0;
let total = 0;
const START1 = - 1.0;
const STOP1 = 1.0;
const START2 = - 200.0;
const STOP2 = 200.0;
const colors = [];
function setup() {
    createCanvas(1024, 1024);
    noStroke();
    frameRate(60);
    total = floor(width / (r * 2));
    for (let count = 0; count < total; count++) {
        angles[count] = 0.0;
        angleV[count] = 0.01 + count / 1000.0;
        colors[count] = color(
            floor(random(50, 100)), floor(random(100, 255)), floor(random(100, 240))
        );
    }
}

function draw() {

}