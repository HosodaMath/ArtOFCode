let b = [];
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    noStroke();
    for(let count = 0; count < 50; count++){
        b.push(random(50, 100))
    }
}

let setbackground = () => {
    background(0, 0, 0);
}

function draw() {

    setbackground();
    ambientLight(127);
    pointLight(255, 255, 255, -100, -100, 400);
    ambientMaterial(255);
    rotateX(frameCount / 100.0);
    rotateY(frameCount / 100.0);
    push();
    for (let countX = 0; countX < 5; countX++) {
        push();
        for (let countY = 0; countY < 100; countY++) {

            {
            
                ambientMaterial(255, countY * 10, b[countY]);
                translate(
                    cos(frameCount * 0.0001 + countX) * 100,
                    sin(frameCount * 0.0001 + countX) * 100,
                    cos(frameCount * 0.0001 + countX) * 100
                );
                
                rotateX(frameCount / 60);
                rotateY(frameCount / 60);
                if (countY % 2 == 0) {
                    push();
                    torus(10, 10);
                    pop();
                }
            }
        }
        pop();
    }
    pop();
    push();
    for (let countX = 0; countX < 5; countX++) {
        push();
        for (let countY = 0; countY < 100; countY++) {

            {
            
                ambientMaterial(b[countY], countY * 10, countY * 10);
                translate(
                    cos(frameCount * 0.0001 + countX) * 100,
                    sin(frameCount * 0.0001 + countX) * 100,
                    cos(frameCount * 0.0001 + countX) * 100
                );
                
                rotateX(frameCount / 60);
                rotateY(frameCount / 60);
                if (countY % 2 != 0) {
                    push();
                    sphere(10);
                    pop();
                }
            }
        }
        pop();
    }
    pop();
}