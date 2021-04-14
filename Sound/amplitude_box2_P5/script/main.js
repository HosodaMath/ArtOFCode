let position = [];
let velocity = [];
let size = [];
const MAX = 30;
const COLOR_SET = ["#6699ff", "#66ff99", "#ffff00"];
let colors = [];
/// noise value
let noise_value;
let inc_x = 0.01;
let inc_z = 0.02;
let cut_off_x, cut_off_y, cut_off_z;
let sound;
let analyzer;
function preload() {
  sound = loadSound("./sound2.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  set_data();
  cut_off_z = 0.0;

  analyzer = new p5.Amplitude();
  analyzer.setInput(sound);
}

function set_data() {
  for (let count = 0; count < MAX; count++) {
    let init_position = createVector(
      random((-1 * width) / 2.0, width / 2.0),
      random((-1 * height) / 2.0, height / 2.0),
      0
    );
    position.push(init_position);
    let init_velocity = new createVector(
      random(-0.5, 0.5),
      random(-0.5, 0.5),
      0
    );
    velocity.push(init_velocity);
    let init_value = random(300, 400);
    let init_size = createVector(init_value, init_value, init_value);
    size.push(init_size);
    let choice = Math.floor(random(0, COLOR_SET.length));
    colors.push(COLOR_SET[choice]);
  }
}

function draw() {
  background(0, 0, 0);
  //renderNoise();
  renderBox();
}

function renderBox() {
  pointLight(250, 250, 250, 0, 0, 500);
  let time = millis() * 0.001;
  for (let count = 0; count < position.length; count++) {
    let box_rotation_angle = createVector(cos(time), sin(time), cos(time));
    let box1 = new Box(
      position[count],
      velocity[count],
      size[count],
      box_rotation_angle
    );
    box1.draw_velocity();
    let rms = analyzer.getLevel();
    box1.draw_box(colors[count], rms);
    console.log(rms);
  }
}

/*
function renderNoise() {
  cut_off_x = 0.0;
  cut_off_y = 0.0;
  noiseDetail(8, 0.65);
  for (let y = 0; y < height; y++) {
    cut_off_x += inc_x;
    cut_off_y = 0;
    for (let x = 0; x < width; x++) {
      noise_value = noise(cut_off_x, cut_off_y, cut_off_z);
      stroke(0, noise_value * 255, noise_value * 255);
      cut_off_y += inc_x;
      point(x, y);
    }
  }

  cut_off_z += inc_z;
}*/

function mousePressed() {
  if (sound.isPlaying() == false) {
    sound.play();
  }
}

class Box {
  constructor(position, velocity, box_size, box_rotation_angle) {
    this.position = position;
    this.velocity = velocity;
    this.box_size = box_size;
    this.box_rotation_angle = box_rotation_angle;
  }

  draw_velocity() {
    this.position.add(this.velocity);
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  draw_box(fill_color, rms) {
    specularMaterial(fill_color);
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(this.box_rotation_angle.x);
    rotateY(this.box_rotation_angle.y);
    rotateZ(this.box_rotation_angle.z);
    scale(this.box_size.x * rms, this.box_size.y * rms, this.box_size.z * rms);
    box(1);
    pop();
  }
}
