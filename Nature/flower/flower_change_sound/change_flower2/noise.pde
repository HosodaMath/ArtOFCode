float inc = 0.01;
float inc_z = 0.0;
float cut_off_z = 0.0;
void renderNoise(){
  loadPixels();
  float cut_off_x = 0.0;
  for(int x = 0; x < width; x++){
    cut_off_x += inc;
    float cut_off_y = 0.0;
    for(int y = 0; y < height; y++){
      cut_off_y += inc;
      float g = noise(cut_off_x, cut_off_y, cut_off_z) * 150;
      float b = noise(cut_off_x, cut_off_y, cut_off_z) * 255;
      pixels[x+y*width] = color(0, g, b);
    }
  }
  updatePixels();

  cut_off_z += inc_z;
}