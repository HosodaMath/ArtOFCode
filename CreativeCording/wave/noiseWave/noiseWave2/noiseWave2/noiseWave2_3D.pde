// gifAnimationライブラリを読み込む
import gifAnimation.*;

// GifMakerクラスを呼ぶ
GifMaker gifExport;
float cutoff_z = 0;
void setup() {
  size(1000, 1000, P3D);
  noStroke();
  frameRate(30);

  // GIFアニメ出力の設定
  gifExport = new GifMaker(this, "export1.gif"); // GifMakerオブジェクトを作る、第2引数にファイル名
  gifExport.setRepeat(0); // エンドレス再生
  gifExport.setQuality(10); // クオリティ(デフォルト10)
  gifExport.setDelay(20); // アニメーションの間隔を20ms(50fps)に
}

void drawNoiseWave(){
  pushMatrix();
  float time = millis() * 0.001;
  float cutoff_x = 0;
  float cutoff_y = 0;
  for(float x = 0; x < width; x += 100){
    for(float y = 0; y < height; y += 100){
      float z = map(noise(cutoff_x, cutoff_y, cutoff_z), 0, 1, 200, 300);
      pushMatrix();
      translate(x, y, z);
      //rotateY(time);
      box(100);
      cutoff_x += 0.05;
      cutoff_y += 0.05;
      popMatrix();
    }
  }
  cutoff_z += 0.01;
  popMatrix();
}

void draw() {
  background(0, 0, 0);
  pointLight(40, 250, 250, width / 2, height / 2, 400);
  drawNoiseWave();

  // GIFアニメ出力用のコード
  // 30fps * 3、つまり丸10秒録画する
  if(frameCount <= 30*10){
    gifExport.addFrame(); // フレームを追加
  } else {
    gifExport.finish(); // 終了してファイル保存
  }
}
