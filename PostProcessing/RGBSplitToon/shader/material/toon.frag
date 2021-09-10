precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

// 座標変換後の法線ベクトル
varying vec3 vertNormal;
// 座標変換後の平行光源
varying vec3 vertLightDir;
// テクスチャ座標
varying vec4 vertTexCoord;

void main(){
  vec2 position = vertTexCoord.xy;

  float intensity = max(0.0, dot(vertNormal, vertLightDir));

  vec4 shadowColor;
  
  if(intensity > 0.95){
    shadowColor = vec4(1.0, 0.7804, 0.9255, 1.0);
  } else if(intensity > 0.5){
    shadowColor = vec4(0.9216, 0.4745, 0.7725, 1.0);
  }  else if(intensity > 0.25){
    shadowColor = vec4(1.0, 0.7804, 0.9255, 1.0);
  } else {
    shadowColor = vec4(0.9882, 0.8549, 0.9451, 1.0);
  }

  gl_FragColor = shadowColor;
}