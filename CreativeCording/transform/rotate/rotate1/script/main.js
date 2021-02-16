let location2, velocity2;
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    location2 = createVector(0, 0);
    velocity2 = createVector(1, 1);
}


function draw() {
    fill(0, 0, 0, 30);
    rect(0, 0 ,width, height);

    translate(width / 2.0, height / 2.0);
    location2.add(velocity2);
    let x = map(cos(location2.x), -1, 1, -200, 200);
    let y = map(sin(location2.y), -1, 1, -200, 200);
    fill(127, 235, 235);
    circle(x, y, 20);
}