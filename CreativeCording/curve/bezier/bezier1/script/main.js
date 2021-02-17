let curve_vec1, curve_vec2;
let curve_vec3, curve_vec4;
let curve_vel;
function setup() {
    createCanvas(windowWidth, windowHeight);
    let shift_x = 200;
    let shift_y = 300;
    curve_vec1 = createVector(0 - 50, height);
    curve_vec2 = createVector(0 + shift_x, height - shift_y);
    curve_vec3 = createVector(width - shift_x, height - shift_y);
    curve_vec4 = createVector(width + 50, height);
    curve_vel = createVector(0, 1);
}

let drawBackground = () => {
    background(0, 0, 0);
}

function draw() {
    drawBackground();
    push();
    stroke("#ffff00");
    strokeWeight(5);
    fill("#ffff00");
    curve_vec2.add(curve_vel);
    curve_vec3.add(curve_vel);
    bezier(
        curve_vec1.x, curve_vec1.y, curve_vec2.x, curve_vec2.y,
        curve_vec3.x, curve_vec3.y, curve_vec4.x, curve_vec4.y
    );

    if (curve_vec2.y < 0 || curve_vec2.y > height && curve_vec3.y < 0 || curve_vec3.y > height) {
        curve_vel.y *= -1;
    }
    pop();

}