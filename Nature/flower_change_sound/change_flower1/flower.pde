interface BaseFlower {
  void drawFlower1(color fillColor);
  void drawFlower2(color fillColor);
  void drawSoundFlower1(color fillColor, float rms);
}
public class Flower implements BaseFlower {
    float size;
    float k;
    Flower(float size, float k){
      this.size = size;
      this.k = k;
    }

    void drawFlower1(color fillColor) {
      ambient(fillColor);
      stroke(color(250, 250, 250));
 
      beginShape();
      for(float theta = 0; theta < 2 * TWO_PI; theta += 0.005){
        float r = this.size * sin(this.k * theta);
        float x = r * cos(theta);
        float y = r * sin(theta);
        vertex(x, y);
      }
      endShape(CLOSE);
    }

    void drawFlower2(color fillColor){
      ambient(fillColor);
      stroke(color(250, 250, 250));
      beginShape();
      for(float theta = 0; theta < 2 * TWO_PI; theta += 0.005){
        float r = this.size * abs(sin(theta * 5)) + this.size / 2.0;
        float x = r * cos(theta);
        float y = r * sin(theta);
        curveVertex(x, y);
      }
      endShape(CLOSE);
    }

    void drawSoundFlower1(color fillColor, float rms) {
      ambient(fillColor);
      stroke(color(250, 250, 250));
 
      beginShape();
      for(float theta = 0; theta < 2 * TWO_PI; theta += 0.005){
        float r = this.size * rms * sin(this.k * theta);
        float x = r * cos(theta);
        float y = r * sin(theta);
        vertex(x, y);
      }
      endShape(CLOSE);
    }
}

