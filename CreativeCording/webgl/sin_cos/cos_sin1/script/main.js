function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    noStroke();
}

function draw() {
    background(0, 0, 0);
    //orbitControl();

    ambientLight(127);
    pointLight(255, 255, 255, -100, -100, 400);
    ambientMaterial(255);
    rotateX(frameCount / 100.0);
    rotateY(frameCount / 100.0);
    for (let countX = 0; countX < 5; countX++) {
        push();
        for (let countY = 0; countY < 50; countY++) {
          
            {
               
                ambientMaterial(255, countY * 10, 40);
                translate(
                    cos(frameCount * 0.0001 + countX) * 100, 
                    sin(frameCount * 0.0001 + countX) * 100, 
                    tan(frameCount * 0.0001 + countX) * 1000
                );
                rotateX(frameCount / 60);
                rotateY(frameCount / 60);
                push();
                sphere(100 / 10);
                pop();
            }
        }
        pop();
    }

}