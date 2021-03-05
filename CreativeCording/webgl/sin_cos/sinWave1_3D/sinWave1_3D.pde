float angles[];
float angleV[]; 
float r = 16.0F;
int total = 0;
final float START1 = - 1.0F;
final float STOP1 = 1.0F;
final float START2 = - 200.0F;
final float STOP2 = 200.0F;
void setup() {
    size(1024, 1024, P3D);
    noStroke();
    frameRate(60);
    total = floor(width / (r * 2));
    angles = new float[total];
    angleV = new float[total];
    for (int count = 0; count  < total; count++) {
        angles[count] = 0.0F;
        angleV[count] = 0.01F +  count / 1000.0F;
    }
}

void setBackground() {
    background(0, 0, 0);
}

void draw() {
    setBackground();
    translate(width / 2, height / 2, 0.0F);
    fill(255, 230, 20);
    pushMatrix();
    for (int count = 0; count < total; count++) {
        float x = map(count, 0, angles.length, - 300, 300);
        float y = map(sin(angles[count]), START1, STOP1, START2, STOP2);
        pushMatrix();
        translate(x, y, 0);
        sphere(r * 2);
        angles[count] += angleV[count];
        popMatrix();
    }
    popMatrix();
}
