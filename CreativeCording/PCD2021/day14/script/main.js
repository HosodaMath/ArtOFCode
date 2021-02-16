let angles = [];
let total = 0;
const START1 = -1;
const STOP1 = 1;
const START2 = -200;
const STOP2 = 200;

let star;
//drawShip
/*
let ship;
function preload(){
    ship = loadImage("./assets/ship2.png");
}*/

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    //noStroke();
    total = width / 20;
    for (let count = 0; count < total; count++) {
        angles[count] = map(count, 0, total, 0, TWO_PI);
    }
    
    star = star_data();
}

let star_data = () => {
    const STAR_MAX = 100;
    const DICT_COLOR_DATA = ["#ff0000", "#ffff00", "#00ffff"];
    
    
    const star_location_data = [];
    const star_radius_data = [];
    const star_color_data = [];

    for(let count = 0; count < STAR_MAX; count++){
        let tmp_location = createVector(random(0, width), random(0, height));
        star_location_data.push(tmp_location);
        let tmp_radius = random(5, 10);
        star_radius_data.push(tmp_radius);
        let tmp_color = int(random(0, DICT_COLOR_DATA.length));
        star_color_data.push(DICT_COLOR_DATA[tmp_color]);
    }

    const ALL_STAR_DATA = [star_location_data, star_radius_data, star_color_data];

    return ALL_STAR_DATA;
}

let set_background = () => {
    
    background(0, 0, 0);
    
    /// createAir
    push();
    fill("#000B2E");
    rect(0, 0, width, height);
    pop();
    
    ///star_field
    let star_location = star[0];
    for(let count = 0; count < star_location.length; count++){
        fill(star[2][count]);
        circle(star[0][count].x, star[0][count].y, star[1][count]);
    }
}

function draw() {
    set_background();
    
   
    let x = 0;
    let y = 0;
    push();
    translate(0, height - height / 4);
    stroke("#ffffff");
    strokeWeight(5);
    fill("#29abe2");
    beginShape();
    vertex(0, height);
    for (let count = 0; count < total; count++) {
        x = map(count, 0, angles.length, 0, width + 20);
        y = map(sin(angles[count]), START1, STOP1, START2, STOP2);
        vertex(x, y);
        circle(x, y, 10);
        angles[count] += 0.02;
       
    }
    vertex(width, height);
    endShape();
    pop();
    
    push();
    translate(0, height - height / 4);
    //let location_x = 0;
    //location_x += 0.1;
    //image(ship, location_x, y);
    pop();
   
}