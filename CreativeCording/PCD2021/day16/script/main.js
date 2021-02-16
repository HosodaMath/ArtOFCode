class Circle {
    constructor(location1, radius) {
        this.location1 = location1;
        this.radius = radius;
    }

    drawCircle1 = (fillColor) => {
        push();
        noStroke();
        fill(fillColor);
        console.log(this.location1.x, this.location1.y, this.radius);
        circle(this.location1.x, this.location1.y, this.radius);
        pop();
    }
}

let colors = [];
let index = 0;
let circle_brushes = [];
let brushes_location = [];
let brushes_velocity = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    clear();
    set_data();
}

let set_data = () => {
    const MAX = 30;
    for (let count = 0; count < MAX; count++) {
        /// color prop
        let r = Math.floor(random(100, 255));
        let g = Math.floor(random(100, 255));
        let b = Math.floor(random(100, 255));
        let alpha = Math.floor(random(10, 30));
        colors.push(color(r, g, b, alpha));


        /// circle brushes
        let location1 = createVector(random(0, width), random(0, height));
        let brushes_size = random(10, 50);
        circle_brushes[count] = new Circle(location1, brushes_size);

        let tmp1 = createVector(
            random(width / 4, width - width / 4),
            random(height / 4, height - height / 4)
        );

        let tmp2 = createVector(
            random(-3, 3),
            random(-3, 3)
        );

        brushes_location.push(tmp1);
        brushes_velocity.push(tmp2);

    }
}

function draw() {
    for (let count = 0; count < colors.length; count++) {
        brushes_location[count].add(brushes_velocity);
        translate(brushes_location[count].x, brushes_location[count].y);  
        circle_brushes[count].drawCircle1(colors[count]);
    }
}