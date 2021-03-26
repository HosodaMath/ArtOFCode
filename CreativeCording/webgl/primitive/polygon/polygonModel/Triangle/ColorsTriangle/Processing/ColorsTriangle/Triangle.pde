class Triangle {
    PVector location1;
    PVector velocity1;
    float size1;
    Triangle(PVector location1, PVector velocity1,float size1) {
        this.location1 = location1;
        this.velocity1 = velocity1;
        this.size1 = size1;
    }
    
    void drawStep() {
        this.location1.add(this.velocity1);
        
        if (this.location1.y > height) {
            this.location1.y = 0;
        }
    }
    
    void drawTriangle() {
        pushMatrix();
        translate(this.location1.x, this.location1.y, this.location1.z);
        scale(this.size1);
        beginShape(TRIANGLES);
        fill(0, 200, 0);
        vertex( - 1, 1, 0);
        fill(0, 0, 200);
        vertex(1, 1, 0);
        fill(0, 200, 200);
        vertex(0, - 1, 0);
        endShape();
        popMatrix();
    }
}