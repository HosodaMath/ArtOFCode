/*
  君は何を作りたいか？
  ペイントツール
  ブラシで絵をかけるようにしたい。
  マウスをクリックすると色を変えられるようにしたい。 -> つまり扱う色は2色
  送信したいのはペイントブラシの座標、ペイントブラシのサイズそしてマウスがクリックされたかどうかの情報

  1. 普通にかけるか確かめる
  2. マウスをクリックで色を変えながら描く
  3. マウス座標のみoscで送信
  4. マウス座標とペイントブラシのサイズを送信
  5. マウス座標とマウスクリックの情報を送信
*/
import oscP5.*;
import netP5.*;
// osc関連
/// インスタンスの作成
OscP5 oscP5;
/// アドレス
NetAddress remoteLocation;

// ペイント関連
/// ペイントカラー
color paintColor;
/// ペイントブラシをの大きさ
 float paint_size;
void setup(){
  size(800, 800);
  frameRate(60);
  // 今回はフチなし
  noStroke();
  // ペイント関連
  /// ペイントなのでバックグラウンドはsetupのところに記述
  /// canvasは白
  background(255, 255, 255);
  /// 黄色で色を初期化
  paintColor = color(255, 255, 100, 80);
  /// ペイントブラシのサイズを初期化
  paint_size = 0.0;
  
  // osc関連
  /// ポートを12001に設定
  oscP5 = new OscP5(this, 12001);
  /// OSC送信先のIPアドレスとポートを指定
  remoteLocation = new NetAddress("127.0.0.1", 12000);
}

void draw(){
  fill(paintColor);
  paint_size = random(0.05, 0.07);
  ellipse(mouseX, mouseY, width *  paint_size, width *  paint_size);

  createMousePositionMessage();
  createPaintSizeMessage();
}

// マウス座標の送信メッセージを作成
void createMousePositionMessage(){
  OscMessage mouse_msg = new OscMessage("/mouse/position");
  // x座標を追加
  mouse_msg.add(mouseX);
  // y座標を追加
  mouse_msg.add(mouseY);
  // oscメッセージを送信
  oscP5.send(mouse_msg, remoteLocation);
}

// ペイントブラシのサイズを送信
void createPaintSizeMessage(){
  OscMessage paint_size_msg = new OscMessage("/paint/size");
  // ペイントブラシのサイズを追加
  paint_size_msg.add(paint_size);
  //oscメッセージを送信
  oscP5.send(paint_size_msg, remoteLocation);
}

/// マウスをクリックしたときオレンジにする。
/// oscの送信もここで行う。
void mousePressed() {
  paintColor = color(255, 165, 0, 80);
  
  OscMessage pressed_msg = new OscMessage("/mouse/cliked");
  // 1(trueの1)を送信
  pressed_msg.add(1);
  // 送信
  oscP5.send(pressed_msg, remoteLocation);
}

/// マウスを離したときもとの黄色に戻す。
/// oscの送信もここで行う。
void mouseReleased() {
  paintColor = color(255, 255, 100, 80);

  OscMessage pressed_msg = new OscMessage("/mouse/cliked");
  // 0(falseの0)を送信
  pressed_msg.add(0);
  // 送信
  oscP5.send(pressed_msg, remoteLocation);
}
