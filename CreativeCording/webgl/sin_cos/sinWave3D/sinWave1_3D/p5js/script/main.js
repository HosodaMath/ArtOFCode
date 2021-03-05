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
    createCanvas(1024, 1024, WEBGL);
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

let setBackground = () => {
    background(0, 0, 0);
}

function draw() {
    setBackground();
    translate(0.0, 0.0, 0.0);
    ambientLight(127, 127, 127);
    pointLight(255, 255, 255, - 100, - 100, 400);
    ambientMaterial(255);
    push();
    for (let count = 0; count < total; count++) {
        let x = map(count, 0, angles.length, - 300, 300);
        let y = map(sin(angles[count]), START1, STOP1, START2, STOP2);
        ambientMaterial(colors[count]);
        push();
        translate(x, y, 0);
        sphere(r * 2);
        angles[count] += angleV[count];
        pop();
    }
    pop();
}