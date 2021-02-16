let angle = 0;
let angleV = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

}


function draw() {
    background(0, 0, 0);
    translate(0, height / 2);

    let x = map(angle, -1, 1, -200, 200);
    let y = map(sin(angle), -1, 1, -200, 200);
    //console.log(angle);
    
    fill(255, 230, 20);
    strokeWeight(5);
    stroke(255);
    //line(0, 0, x, y);
    line(0, y, width, y);
    line(x, height, x, y);
    circle(x, y, 100);


    angle += angleV;
    angleV += 0.0001;
}