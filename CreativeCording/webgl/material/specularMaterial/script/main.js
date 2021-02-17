function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    noStroke();
}

function draw() {
    background(0, 0, 0);
    orbitControl();

    //normalMaterial();
    //なぜライトが必要
    ambientLight(127);
    pointLight(255, 255, 255, -100, -100, 400);
    //ambientMaterial(255);
    specularMaterial(255);
    push();
    {
        push();
        translate(-width / 4, 0);
        rotateX(frameCount / 60);
        sphere(100);
        pop();
    }
    pop();
    
    push();
    {
        push();
        translate(width / 4, 0);
        rotateX(frameCount / 60);
        rotateY(frameCount / 60);
        box(100, 100, 100);
        pop();
    }
    pop();
}