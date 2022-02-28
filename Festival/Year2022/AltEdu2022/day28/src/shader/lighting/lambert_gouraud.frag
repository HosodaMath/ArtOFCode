#version 300 es
precision highp float;
precision highp int;

in vec4 vColor;
out vec4 fragColor;
void main(){
  // フラグメントシェーダーで最終的な色を出力
  fragColor = vColor;
}