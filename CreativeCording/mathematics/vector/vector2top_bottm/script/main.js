

let colors = [];
let particle = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();

    const ParticleMax = 200;
    for (let count = 0; count < ParticleMax; count++) {
        particle[count] = new Particle(random(0, width), 0, 0, random(1, 3));
        colors[count] = color(random(100, 255), random(100, 255), random(10, 20));
    }
}

function draw() {
    background("rgba(0, 0, 0, 0.2)");
    renderParticle();
}

class Particle {
    constructor(x1, y1, x2, y2) {
        this.location1 = createVector(x1, y1);
        this.velocity1 = createVector(x2, y2);
        this.size = random(2, 5);
        this.initAngle = random(0, 2 * Math.PI);
        this.radius = Math.sqrt(random(Math.pow(width / 2, 2)));
    }

    drawParticle(fill_color) {
        fill(fill_color);
        circle(this.location1.x, this.location1.y, this.size);
    }

    stepParticle(time) {
        this.location1.add(this.velocity1);
        const W = 0.6;
        const ANGLE = W * time + this.initAngle;
        this.location1.x = width / 2 + this.radius * Math.sin(ANGLE);
        if (this.location1.y > height) {
            this.location1.y = 0;
        }
    }
}

let renderParticle = () => {
    let t = frameCount / 60.0;
    for (let count = 0; count < particle.length; count++) {
        particle[count].drawParticle(colors[count]);
        particle[count].stepParticle(t);
    }
}
