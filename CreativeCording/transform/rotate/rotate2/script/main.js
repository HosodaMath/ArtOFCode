let location2;
let velocity2;
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    location2 = createVector(0, 0);
    velocity2 = createVector(0.01, 0.1);

}


function draw() {
    fill(0, 0, 0, 30);
    rect(0, 0, width, height);

    for (let count = 0; count < 10; count++) {
        //translate(random(0, width), random(0, height));
        push();
        translate(width / 2.0, height / 2.0);
        location2.add(velocity2);
        let tmpContstrainX = random(50, 200);
        let tmpContstrainY = random(50, 200);
        let x = map(cos(location2.x), -1, 1, -1 * tmpContstrainX, tmpContstrainX);
        let y = map(sin(location2.y), -1, 1, -1 * tmpContstrainY, tmpContstrainY);
        fill(random(1, 255), random(1, 255), random(1, 255));
        circle(x, y, 20);
        pop();
    }
}