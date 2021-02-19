let particle = [];
let colors = [];
class Particle {
    /**
     * 
     * @param {p5.Vector} location1 
     * @param {p5.Vector} velocity1 
     */
    constructor(location1, velocity1) {
        this.location1 = location1;
        this.velocity1 = velocity1;
    }

    addParticle = () => {
        this.location1.add(this.velocity1);
        if (this.location1.x < 0 || this.location1.x > width) {
            this.velocity1.x *= -1;
        }

        if (this.location1.y < 0 || this.location1.y > height) {
            this.velocity1.y *= -1;
        }
    }

    /**
     * 
     * @param {string} fill_color 
     */
    drawParticle = (fill_color) => {
        fill(fill_color);
        ellipse(this.location1.x, this.location1.y, 50, 50);
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    const MAX = 50;
    for (let count = 0; count < MAX; count++) {
        let init_location = createVector(random(0, width), random(0, height));
        let init_velocity = createVector(random(-2, 2), random(-2, 2));
        particle[count] = new Particle(init_location, init_velocity);
        colors[count] = color(random(200, 250), random(200, 255), random(150, 200));
    }
}

function draw() {
    background("rgba(0, 0, 0, 0.2)");
    for(let count = 0; count < colors.length; count++){
        particle[count].addParticle();
        particle[count].drawParticle(colors[count]);

    }

}