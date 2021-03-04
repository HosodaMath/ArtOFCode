let angles = [];
let angleV =[];
let r = 16;
let total = 0;
const START1 = -1;
const STOP1 = 1;
const START2 = -200;
const STOP2 = 200;
//let wave_data = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    //wave_data = generate_wave_data();
    total = floor(width / (r * 2));
    for (let count = 0; count < total; count++) {
        angles[count] = 0;
        angleV[count] = 0.01 +  count / 1000;
    }

}

let set_background = () => {
    background(0, 0, 0);
    //render_wave();
}

function draw() {
    set_background();

    translate(width / 2, height / 2);
    fill(255, 230, 20);
    strokeWeight(1);
    stroke(255);
    for (let count = 0; count < total; count++) {
        let x = map(count, 0, angles.length, -300, 300);
        let y = map(sin(angles[count]), START1, STOP1, START2, STOP2);
        line(x, 0, x, y);
        circle(x, y, r * 2);
        angles[count] += angleV[count];
    }
    //angle += angleV;
    //angleV += 0.0001;


}