let angle = 0;
let angleV = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

}



function draw() {
    background(0, 0, 0);


    let x = map(cos(angle), -1, 1, -200, 200);
    let y = map(sin(angle), -1, 1, -200, 200);
    console.log(x, y);

    fill(255, 230, 20);
   
 
    push();
    strokeWeight(10);
    stroke(255);
    translate(0, height / 2);
    line(0, y, width, y);
    pop();

    push();
    strokeWeight(5);
    stroke(255);
    translate(width / 2, height / 2);
    line(x, height, x, y);
    circle(x, y, 100);
    pop();


    angle += angleV;
    angleV += 0.0001;
}