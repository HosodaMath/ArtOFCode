let location1 = [];
let velocity1 = [];
let colors = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    const MAX = 50;
    for (let count = 0; count < MAX; count++) {
        location1[count] = createVector(random(0, width), random(0, height));
        velocity1[count] = createVector(1, 0);
        colors[count] = color(random(100, 255), random(100, 255), random(10, 30));
    }
}


let renderParticle = () => {
    const N = colors.length;
    for (let count = 0; count < N; count++) {

        location1[count].add(velocity1[count]);
        fill(colors[count]);
        ellipse(location1[count].x, location1[count].y, 10, 10);

        if (location1[count].x > width) {
            location1[count].x = 0;
            location1[count].y = random(0, height);
            colors[count] = color(random(100, 255), random(100, 255), random(10, 30));
        }
    }
}

function draw() {
    background(0, 0, 0);
    renderParticle();
}