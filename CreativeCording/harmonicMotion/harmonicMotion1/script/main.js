let angle = 0;
let angleV = 0;
function setup() {
    createCanvas(512, 512);
    //frameRate(60);
}

function draw() {
    translate(width / 2, height / 2);
    background(0 ,0 ,0);
    fill(255, 230, 20);
    //let r = 180;
    //let r = sin(angle) * 200;
    //let r = map(sin(angle), -1, 1, 0, 200);
    let y = map(sin(angle), -1, 1, -200, 200);
    strokeWeight(5);
    stroke(255);
    line(0, 0, 0, y);
    circle(0, y, 100);

    //angle += 0.01;
    //let sum = TWO_PI / 60;
    //angle += sum;
    angle += angleV;
   angleV += 0.0001;
    console.log(frameRate());
}