function setup() {
    createCanvas(512, 512, WEBGL);
    noStroke();
  }
  
  
  let Triangle2 = () => {
    push();
    scale(100);
    beginShape(TRIANGLES);
    fill("#00ff00");
    vertex(-1, 1, 0);
    fill("#0000ff");
    vertex(1, 1, 0);
    fill("#00ffff");
    vertex(0,-1,0);
    endShape();
    pop();
  }
  
  function draw() {
    background(0, 0, 0);
    //Triangle2();
  }