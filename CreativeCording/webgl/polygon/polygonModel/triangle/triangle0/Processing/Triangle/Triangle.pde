import gifAnimation.*;
GifMaker gifExport;
void setup() {
    size(800, 800, P3D);
    frameRate(30);
    
    gifExport = new GifMaker(this, "triangle3D.gif"); // GifMakerオブジェクトを作る、第2引数にファイル名
    gifExport.setRepeat(0); // エンドレス再生
    gifExport.setQuality(10); // クオリティ(デフォルト10)
    gifExport.setDelay(20); // アニメーションの間隔を20ms(50fps)に
}

void drawTriangle2()
{
    
    pushMatrix();
    fill(color(200, 200, 255, 200));
    stroke(color(200, 250, 200, 200));
    strokeWeight(5.0F);
    translate(width / 2.0F, height / 2.0F, 0.0F);
    beginShape();
    vertex(0.0F, 0.0F - 100.0F, 0.0F);
    vertex(0.0F - 100.0F, 0.0F + 100.0F, 0.0F);
    vertex(0.0F + 100.0F, 0.0F + 100.0F, 0.0F);
    endShape(CLOSE);
    popMatrix();
}

void drawTriangle3()
{
    
    pushMatrix();
    stroke(color(200, 250, 200, 200));
    noFill();
    strokeWeight(10.0F);
    translate(width / 2.0F, height / 2.0F, 0.0F);
    //rotateX(frameCount * 0.01);
    rotateY(- frameCount * 0.001);
    
    beginShape();
    vertex(0.0F, 0.0F - 100.0F, 0.0F);
    vertex(0.0F - 100.0F, 0.0F + 100.0F, 100.0F);
    vertex(0.0F + 100.0F, 0.0F + 100.0F, 100.0F);
    //endShape(CLOSE);
    
    //beginShape();
    vertex(0.0F, 0.0F - 100.0F, 0.0F);
    vertex(0.0F + 100.0F, 0.0F + 100.0F, 100.0F);
    vertex(0.0F, 0.0F + 100.0F, - 100.0F);
    //endShape(CLOSE);
    
    
    //beginShape();
    vertex(0.0F, 0.0F - 100.0F, 0.0F);
    vertex(0.0F, 0.0F + 100.0F, - 100.0F);
    vertex(0.0F - 100F, 0.0F + 100.0F, 100.0F);
    endShape(CLOSE);
    
    popMatrix();
}

void drawCoordinate() {
    pushMatrix();
    strokeWeight(5.0);
    translate(0, height / 2.0F, 0.0F);
    beginShape(LINES);
    for (int x = 0; x < width; x += 50) {
        vertex(x,  0 + 100,  - width);
        vertex(x, 0 + 100, width);
    }
    endShape();
    popMatrix();
}

void draw() {
    background(0, 0, 0);
    //drawCoordinate();
    //drawTriangle2();
    drawTriangle3();
    
    if (frameCount <= 50 * 10) {
        gifExport.addFrame(); // フレームを追加
    } else {
        gifExport.finish(); // 終了してファイル保存
    }
}
