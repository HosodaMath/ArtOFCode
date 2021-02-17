let location1 = [];
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    noStroke();
    for (let count = 0; count < 255; count++) {
        let depth = width;
        location1[count] = createVector(
            random(-width / 4, width / 4), random(-height / 4,height / 4), random(-depth / 4, depth / 4)
        );
    }
}

function draw() {
    background(0, 0, 0);
   //orbitControl();

    ambientLight(127);
    pointLight(255, 255, 255, -100, -100, 400);
    ambientMaterial(255);
    rotateX(frameCount / 60.0);
    rotateY(frameCount / 60.0);
    for (let count = 0; count < location1.length; count++) {
        push();
        {
            push();
            ambientMaterial(0, 255, count);
            translate(location1[count].x, location1[count].y, location1[count].z);
            rotateX(frameCount / 60);
            sphere(100 / 5);
            pop();
        }
        pop();
    }
}