import gifAnimation.*;
GifMaker gifExport;

void setup() {
    size(800, 800, P3D);
    frameRate(30);
    
    gifExport = new GifMaker(this, "triangle0_3D.gif"); 
    gifExport.setRepeat(0); 
    gifExport.setQuality(10); 
    gifExport.setDelay(20); 
}

void drawTriangleFill1()
{
    
    pushMatrix();
    
    strokeWeight(1.0F);
    translate(width / 2.0F, height / 2.0F, 0.0F);
    rotateY( - frameCount * 0.01);
    
    beginShape(TRIANGLES);
    
    stroke(color(200, 250, 200, 200));
    fill(color(200, 200, 250, 200));
    vertex( - 100.0F, 100.0F, 100.0F);
    vertex(0.0F, 0.0F, 0.0F);
    vertex(100.0F, 100.0F, 100.0F);
    
    stroke(color(200, 250, 200, 200));
    fill(color(250, 250, 50, 200));
    vertex(100.0F, 100.0F, 100.0F);
    vertex(0.0F, 0.0F, 0.0F);
    vertex(0.0F, 100.0F, - 100.0F);
    
   stroke(color(200, 250, 200, 200));
    fill(color(250, 250, 50, 200));
    vertex(100.0F, 100.0F, 100.0F);
    vertex(0.0F, 0.0F, 0.0F);
    vertex(0.0F, 100.0F, - 100.0F);
    
    stroke(color(200, 250, 200, 200));
    fill(color(50, 50, 250, 200));
    vertex( - 100.0F, 100.0F,  100.0F);
    vertex(100.0F, 100.0F,  100.0F);
    vertex(0.0F, 100.0F,  - 100.0F);
    
    endShape();
    
    popMatrix();
}


void draw() {
    background(0, 0, 0);
    
    drawTriangleFill1();
    
    if (frameCount <= 50 * 10) {
        gifExport.addFrame(); 
    } else {
        gifExport.finish();
    }
}



