float angles[];
float angleV[]; 
float r = 16.0F;
int total = 0;
final float START1 = - 1.0F;
final float STOP1 = 1.0F;
final float START2 = - 400.0F;
final float STOP2 = 400.0F;
color colors[];
void setup() {
    //size(1024, 1024, P3D);
    fullScreen(P3D);
    frameRate(60);
    noStroke();
    total = floor(width / (r * 2));
    angles = new float[total];
    angleV = new float[total];
    colors = new color[total];
    for (int count = 0; count  < total; count++) {
        angles[count] = 0.0F;
        angleV[count] = 0.01F +  count / 1000.0F;
        colors[count] = color(
            100.0F, random(200, 255), 100.0F
        );
    }
}

void setBackground() {
    background(0, 0, 0);
}

void draw() {
    setBackground();
    translate(width / 2, height / 2, 0.0F);
    ambientLight(127, 127, 127);
    pointLight(155, 255, 155, - 100, - 100, 400);
    ambient(255);
    pushMatrix();
    rotateX(frameCount * 0.01);
    for (int count = 0; count < total; count++) {
        float x = map(count, 0, angles.length, - 400, 400);
        float y = map(sin(angles[count]), START1, STOP1, START2, STOP2);
        float z = map(count, 0, angles.length, - 400, 400);
        ambient(colors[count]);
        pushMatrix();
        translate(x, y, z);
        box(r * 2);
        angles[count] += angleV[count];
        popMatrix();
    }
    popMatrix();

    //saveFrame("frames/######.png");
}
