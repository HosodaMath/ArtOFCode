/*
  君は何を作りたいか？
  ペイントツール
  ブラシで絵をかけるようにしたい。
  マウスをクリックすると色を変えられるようにしたい。 -> つまり扱う色は2色
  受信したいのはペイントブラシの座標とマウスがクリックされたかどうかの情報

  1. 普通にかけるか確かめる
  2. マウスをクリックで色を変えながら描く
  3. マウス座標のみoscで送信
  4. マウス座標とマウスクリックの情報を送信
*/

import oscP5.*;
import netP5.*;

// osc関連
/// インスタンスの作成
OscP5 oscP5;

// ペイント関連
PVector mousePostion;
color paintColor;
float paint_size;
int clicked;

void setup(){
  size(800,800);
  frameRate(60);
  noStroke();
  // osc関連の初期化
  /// ポートを12000に設定して新規にOSCP5のインスタンスを生成
  oscP5 = new OscP5(this,12000);
  
  // ペイント関連の初期化
  /// canvasを白で固定
  background(255, 255, 255);
  /// マウスの位置ベクトルを初期化
  mousePostion = new PVector(width/2, height/2);
  //// 色をディープスカイブルーで初期化
  paintColor = color(0, 191, 255, 80);
  /// ペイントブラシのサイズを初期化
  paint_size = 0.0;
  /// マウスクリックの初期化
  clicked = 1;
}

void draw(){
  if(clicked == 1){
    paintColor = color(0, 191, 255, 80);
    fill(paintColor);
    ellipse(mousePostion.x, mousePostion.y, width * paint_size, height * paint_size);
  } else {
    paintColor = color(127, 255, 212, 80);
    fill(paintColor);
    ellipse(mousePostion.x, mousePostion.y, width * paint_size, height * paint_size);
  }
  
}

//OSCメッセージを受信した際に実行するイベント
/// get内の数字は読み込む順番
void oscEvent(OscMessage msg) {
  //もしOSCメッセージが /mouse/position だったら
  if(msg.checkAddrPattern("/mouse/position")==true) {
    //最初の値をint型としてX座標に
    mousePostion.x = msg.get(0).intValue();
    //次の値をint型としてY座標に
    mousePostion.y = msg.get(1).intValue();
  }

  if(msg.checkAddrPattern("/paint/size")==true) {
    paint_size = msg.get(0).floatValue();
  }

  if(msg.checkAddrPattern("/mouse/cliked")==true) {
    // Bool値を読み込み
    // 0か1を読み込んでいる
    clicked = msg.get(0).intValue(); 
    println("msg = " + clicked);
    print("*");
  }
}
