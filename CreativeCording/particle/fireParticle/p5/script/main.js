class Particle {
    constructor(location, colors) {
        this.location = location;
        this.colors = colors;
        this.velocity = createVector(random(-1, 1), random(-2, 0));
        this.radius = random(10, 20)
    }

    run() {
        this.location.x = this.location.x + this.velocity.x;
        this.location.y = this.location.y + this.velocity.y;
    }

    gravity() {
        this.velocity.y += 0.1;
    }

    display() {
        push();
        fill(this.colors);
        noStroke();
        translate(this.location.x, this.location.y);
        beginShape();
        for (let theta = 0; theta < 360; theta++) {
            vertex(this.radius * pow(cos(radians(theta)), 3),
                this.radius * pow(sin(radians(theta)), 3));
        }
        endShape(CLOSE);
        pop();
    }
}

let particles;
let time;
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    particles = [];
    time = 0;
}

function draw() {
    background(5, 5, 20);
    time += 0.01;
    let location = createVector(random(0, width), random(0, height));

    if (time > 0 && time < 10) {
        let colors = color(floor(random(20, 30)), floor(random(150, 255)), floor(random(150, 255)));
        particles.push(new Particle(location, colors));
    } else if (time > 10 && time < 20) {
        let colors = color(floor(random(150, 255)), floor(random(150, 255)), floor(random(20, 30)));
        particles.push(new Particle(location, colors));
    }

    particles.forEach(runParticle);
    function runParticle(p) {
        p.run();
        p.gravity();
        p.display();
    }

    if (particles.length > 50) {
        particles.splice(0, 1);
    }
}