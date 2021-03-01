package geometry;
import processing.core.*;
public class Triangle extends PApplet {
    @Override
    public void settings(){
        //size(1024, 1024);
        fullScreen(P3D);
    }

    @Override
    public void setup(){
        noStroke();

    }

    void drawTriangle(){
        ambientLight(127.0F, 127.0F, 127.0F);
        pointLight(200.0F, 255.0F, 200.0F, 0.0F, 0.0F, 200.0F);
        ambient(100.0F, 200.0F, 100.0F);

        pushMatrix();

        translate(width / 2.0F, height / 2.0F, 0.0F);
        rotateY( -frameCount * 0.01F);
        scale(200);

        beginShape(TRIANGLES);
        vertex(-1.0F, 1.0F, 1.0F);
        vertex(0.0F, 0.0F, 0.0F);
        vertex(1.0F, 1.0F, 1.0F);

        vertex(1.0F, 1.0F, 1.0F);
        vertex(0.0F, 0.0F, 0.0F);
        vertex(0.0F, 1.0F, -1.0F);

        vertex(0.0F, 1.0F, -1.0F);
        vertex(0.0F, 0.0F, 0.0F);
        vertex(-1.0F, 1.0F, 1.0F);

        vertex(-1.0F, 1.0F, 1.0F);
        vertex(1.0F, 1.0F, 1.0F);
        vertex(0.0F, 1.0F, -1.0F);

        endShape(CLOSE);

        popMatrix();
    }

    void drawBackground(){
        background(0, 0, 0);
    }

    @Override
    public void draw(){
        drawBackground();
        drawTriangle();
        saveFrame("frames/######.png");
    }

    public static void main(String[] args) {

        PApplet.main("geometry.Triangle");
    }
}
