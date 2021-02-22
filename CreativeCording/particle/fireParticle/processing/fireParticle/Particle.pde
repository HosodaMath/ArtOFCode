class Particle {
  PVector location;
  PVector velocity;
  color colors;
  float radius;

  Particle(PVector init_location, color init_colors) {
    location = init_location;
    colors = init_colors;
    //これを設定しないと左右にぼとぼと落ちない
    velocity = new PVector(random(-1, 1), random(-2, 0));
    radius = random(10, 20);
  }

  void run(){
    location.x = location.x + velocity.x;
    location.y = location.y + velocity.y;
  }

  void gravity(){
    velocity.y += 0.1;
  }

  void display(){
    pushMatrix();
    fill(colors);
    noStroke();
    translate(location.x, location.y);
    beginShape();
    for(int theta = 0; theta < 360; theta++){
      vertex(radius * pow(cos(radians(theta)), 3), 
      radius * pow(sin(radians(theta)), 3));
    }
    endShape(CLOSE);
    popMatrix();
  }
}
