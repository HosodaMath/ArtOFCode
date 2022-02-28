#version 300 es
precision highp float;
precision highp int;

in vec4 vColor;
in vec2 vTexCoord;
out vec4 fragColor;
void main(){

  vec2 coord = vTexCoord;
  vec4 color = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0);

  // フラグメントシェーダーで最終的な色を出力
  fragColor = vColor * color;
}