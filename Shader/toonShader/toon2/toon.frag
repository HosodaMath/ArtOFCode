precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float vFrameCount;

// 座標変換後の法線ベクトル
varying vec3 vertNormal;
// 座標変換後の平行光源
varying vec3 vertLightDir;
// テクスチャ座標
varying vec4 vertTexCoord;

void main(){
  vec2 position = vertTexCoord.xy;

  float intensity = max(0.0, dot(vertNormal, vertLightDir));
  vec4 color;

  if(intensity > 0.95){
    color = vec4(position.x, position.y, abs(cos(time)), 1.0);
  } else if(intensity > 0.5){
    color = vec4(position.x, position.y, abs(cos(time)), 1.0);
  }  else if(intensity > 0.25){
    color = vec4(position.x, position.y, abs(cos(time)), 1.0);
  } else {
    color = vec4(position.x, position.y, abs(cos(time)), 1.0);
  }

  gl_FragColor = color;
}