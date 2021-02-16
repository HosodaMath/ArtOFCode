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
        //angles[count] = map(count, 0, total, 0, 2 * TWO_PI);
        angles[count] = map(count, 0, total, 0, TWO_PI);
        angleV[count] = 0.01 +  count / 1000;
    }

}

/**
 * 
 * @param {color | string} stroke_color 
 * @param {number} stroke_weight 
 */
/*
let polygon = (stroke_color, stroke_weight = 1.0) => {
    push();
    noFill();
    stroke(stroke_color);
    strokeWeight(stroke_weight);
    beginShape();
    for(let count = 0; count < wave_data.length; count++){
        vertex(wave_data[count].x, wave_data[count].y);
    }
    endShape();
    pop();
}

let generate_wave_data = () => {
    for (let count_x = 0; count_x < width; count_x++) {
        angle += angleV;
        angleV += 0.0001;
        let count_y = map(sin(angle), START1, STOP1, START2, STOP2);
        let tmp = createVector(count_x, count_y);
        wave_data.push(tmp);
        
    }
    console.log(wave_data);
    return wave_data;
}

let render_wave = () => {
    push();
    translate(0, height / 2);
    polygon(color(255, 230, 20));
    pop();
}
*/

let set_background = () => {
    background(0, 0, 0);
    //render_wave();
}

function draw() {
    set_background();

    translate(width / 2, height / 2);
    fill(255, 230, 20);
    //noFill();
    strokeWeight(1);
    stroke(255, 230, 20);
    //beginShape();
    for (let count = 0; count < total; count++) {
        let x = map(count, 0, angles.length, -400, 400);
        let y = map(sin(angles[count]), START1, STOP1, START2, STOP2);
        //vertex(x, y);
        line(x, 0, x, y);
        circle(x, y, r * 2);
        angles[count] += 0.02;
        //angles[count] += angleV[count];
    }
    //endShape();
    //angle += angleV;
    //angleV += 0.0001;


}