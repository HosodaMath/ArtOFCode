let colors = [];
let location1;
let velocity1;
let coordinate = [];
let circle_radius = [];
let size_radius = [];
let index = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    //colors.push(color(255, 255, 0, 10));
    //colors.push(color(100, 200, 200, 10));
    noStroke();
    clear();
    location1 = createVector(0, 0);
    velocity1 = createVector(0.5, 0.5);
    set_init_location();
}

let set_init_location = () => {
    const MAX = 20;
    for (let count = 0; count < MAX; count++) {
        //constrain mapを使う
        let tmp_location_x = random(width / 4.0, width - width / 4.0);
        let tmp_location_y = random(height / 4.0, height - height / 4.0);
        coordinate[count] = createVector(tmp_location_x, tmp_location_y);
        let r = Math.floor(random(100, 255));
        let g = Math.floor(random(100, 255));
        let b = Math.floor(random(100, 255));
        let alpha = Math.floor(random(5, 10));
        colors.push(color(r, g, b, alpha));
        circle_radius.push(random(5, 10));
        size_radius.push(random(50, 300));
    }
    //console.log(colors);
}

function draw() {
    for (let count = 0; count < colors.length; count++) {
        push();
        translate(coordinate[count].x, coordinate[count].y);
        location1.add(velocity1);
        let x = cos(location1.x) * size_radius[count];
        let y = sin(location1.y) * size_radius[count];
        fill(colors[count]);
        circle(x, y, circle_radius[count]);
        pop();
    }

    if (random(1) < 0.01) {
        index = (index + 1) % colors.length;
    }


}