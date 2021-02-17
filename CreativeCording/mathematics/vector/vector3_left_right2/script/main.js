let colors = [];
let particle = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noStroke();
    let particle_color = ["#ffebcd", "#ffe4c4", "#faebd7", "#deb887", "#fff8dc", "#ffe4b5", "#ffdead"]
    const ParticleMax = 1000;
    for (let count = 0; count < ParticleMax; count++) {
        particle[count] = new Particle(0, random(0, height), random(2, 5), 0);
        let tmp = Math.floor(random(0, particle_color.length));
        colors[count] = color(particle_color[tmp]);
    }
}

function draw() {
    background(color(100, 200, 200));
    let grad_color = drawingContext.createLinearGradient(
        width / 2.0, 0, width / 2.0, height);

    grad_color.addColorStop(0, "#1ab6ff");
    grad_color.addColorStop(0.5, "#5dd5ff");
    grad_color.addColorStop(1.0, "#d3ffff");

    drawingContext.fillStyle = grad_color;

    rect(0, 0, width, height);
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
        if (this.location1.x > width) {
            this.location1.x = 0;
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
