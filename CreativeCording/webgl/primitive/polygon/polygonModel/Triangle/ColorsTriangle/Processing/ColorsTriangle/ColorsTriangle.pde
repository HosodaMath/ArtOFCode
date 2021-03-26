PVector[] location;
PVector[] velocity;
float[] size;
final int MAX = 20;
float time;
void setup() {
    size(800, 800, P3D);
    
    noStroke();
    setTriangle();
    time = 0;
}

void setTriangle() {
    location = new PVector[MAX];
    velocity = new PVector[MAX];
    size = new float[MAX];
    float depth = width;
    for (int count = 0; count < MAX; count++) {
        location[count] = new PVector(
            random(0, width),
            random(0, height),
            random(0, random(0, depth / 2.0))
           );
        
        
        velocity[count] = new PVector(
            0, random(1, 2), 0
           );
        
        size[count] = random(50, 100);
    }
}

void renderTriangle() {
    for (int count = 0; count < MAX; count++) {
        Triangle triangle = new Triangle(location[count], velocity[count], size[count]);
        triangle.drawStep();
        triangle.drawTriangle();
    }
}

void draw() {
    background(0, 0, 0);
    time += 0.01;
    pushMatrix();
    rotateX(time);
    scale(sin(time));
    renderTriangle();
    popMatrix();
}
