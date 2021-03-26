
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

let triangle1 = [];
let colors = [];
let ambientMatrialColor = [];
const MAX = 30;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
    noStroke();
    
    setTriangle();
}

let setTriangle = () => {
    let depth = width;
    for (let count = 0; count < MAX; count++) {
        let location_x = random(-width / 2.0, width / 2.0 - 100.0);
        let location_y = random(-height / 2.0, height / 2.0 - 100.0);
        let location_z = random(-depth / 2.0, depth / 2.0);

        let coordinate = createVector(location_x, location_y, location_z);
        let triangle_size = random(20.0, 50.0);
        triangle1[count] = new Triangle(coordinate, triangle_size);

        let r = random(50.0, 100.0);
        let g = random(150.0, 250.0);
        let b = random(100.0, 250.0);

        colors[count] = new Color(r, g, b);
        ambientMatrialColor[count] = colors[count]
    }
}

let renderTriangle = () => {
    pointLight(200.0, 255.0, 200.0, 0.0, 0.0, 100.0);
    ambientLight(127.0, 127.0, 127.0);
    push();
    translate(
        cos(frameCount * 0.01) * 50.0, 
        sin(frameCount * 0.01) * 50.0, 
        tan(frameCount * 0.01) * 50.0
    );
    for(let count = 0; count < MAX; count++){
        //triangle1[count].testTriangle(colors[count]);
        triangle1[count].drawTriangle(ambientMatrialColor[count]);
    }
    pop();
}

function draw() {
    background(0, 0, 0);

    renderTriangle();
}