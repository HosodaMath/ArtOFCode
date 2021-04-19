const MAX = 25;
const position = [];
const flower = [];
const colors = [];
let amp;
let sound;
function preload() {
  sound = loadSound("sound2.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setFlower();

  amp = new p5.Amplitude();
  amp.setInput(sound);
}

function setFlower() {
  const color_set = [
    color(255, 193, 143),
    color(245, 252, 174),
    color(250, 170, 214),
  ];

  for (let count = 0; count < MAX; count++) {
    const init_position = createVector(random(0, width), random(0, height));
    position.push(init_position);

    const number_choice = floor(random(2.0, 4.0));
    const k = 7.0 / number_choice;
    const init_size = random(100, 200);
    const init_flower = new Flower(init_size, k);
    flower.push(init_flower);

    const color_choice = floor(random(0, color_set.length));
    colors.push(color_set[color_choice]);
  }
}

function draw() {
  background(0, 0, 0);
  let rms = amp.getLevel();
  for(let count = 0; count < flower.length; count++){
    push();
    translate(position[count].x, position[count].y);
    rotate(millis() * 0.001);
    flower[count].drawSoundFlower1(colors[count], rms);
    pop();
  }
}

function mousePressed(){
  if(sound.isPlaying() == false){
    sound.play();
  }
}

class Flower {
  constructor(size, k) {
    this.size = size;
    this.k = k;
  }

  drawFlower1(fillColor) {
    fill(fillColor);
    stroke(color(250, 250, 250));

    beginShape();
    for (let theta = 0; theta < 2 * TWO_PI; theta += 0.005) {
      const r = this.size * sin(this.k * theta);
      const x = r * cos(theta);
      const y = r * sin(theta);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  drawFlower2(fillColor) {
    fill(fillColor);
    stroke(color(250, 250, 250));
    beginShape();
    for (let theta = 0; theta < 2 * TWO_PI; theta += 0.005) {
      let r = this.size * abs(sin(theta * 5)) + this.size / 2.0;
      let x = r * cos(theta);
      let y = r * sin(theta);
      curveVertex(x, y);
    }
    endShape(CLOSE);
  }

  drawSoundFlower1(fillColor, rms) {
    fill(fillColor);
    stroke(color(250, 250, 250));

    beginShape();
    for (let theta = 0; theta < 2 * TWO_PI; theta += 0.005) {
      let r = this.size * rms * sin(this.k * theta);
      let x = r * cos(theta);
      let y = r * sin(theta);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
