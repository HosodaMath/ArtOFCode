let colors = [];
let location1 = [];
let velocity1 = [];
let radius1 = [];
let index = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    colors.push(color(255, 255, 0, 10));
    colors.push(color(100, 200, 200, 10));
    noStroke();
    clear();
    for (let count = 0; count < 30; count++) {
        location1[count] = createVector(
            random(width / 4, width - width / 4), 
            random(height / 4, height - height / 4)
        );
        velocity1[count] = createVector(
            random(-2, 2), 
            random(-2, 2)
        );
        radius1[count] = random(5, 30);
    }
}

function draw() {
    for (let count = 0; count < 30; count++) {
        location1[count].add(velocity1[count]);

        if (location1[count].x < 0 || location1[count].x > width) {
            velocity1.x *= -1;
        }

        if (location1[count].y < 0 || location1[count].y > height) {
            velocity1[count].y *= -1;
        }
        fill(colors[index]);
        circle(location1[count].x, location1[count].y, radius1[count]);
    }

    if(random(1) < 0.01){
        index = (index + 1) % colors.length;
    }

}