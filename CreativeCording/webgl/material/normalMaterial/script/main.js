function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
}

function draw() {
    background(0, 0, 0);
    orbitControl();

    normalMaterial();
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