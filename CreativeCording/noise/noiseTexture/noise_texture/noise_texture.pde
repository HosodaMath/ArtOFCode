void setup() {
  size(1024, 1024);
  background(255, 255, 255);

  PImage gradient = createImage(width, height, RGB);
  
  for(int x = 0; x < width; x++){
    for(int y = 0; y < height; y++){
      color colors1 = color(random(100, 120), random(200, 250), noise(x * y * 0.01) * 250);
      color colors2 = color(random(100, 120), noise(x * y * 0.01) * 250, random(200, 210));
      gradient.set(x, y / 2, colors1);
      gradient.set(x, y, colors2);
    }
  }

  set(0, 0, gradient);

  saveFrame("capture/######" + minute() + millis() + ".png");
}
