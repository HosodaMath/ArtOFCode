precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

// 座標変換後の法線ベクトル
varying vec3 vertNormal;
// 座標変換後の平行光源
varying vec3 vertLightDir;
varying vec4 vertColor;
// テクスチャ座標
varying vec4 vertTexCoord;

#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

vec4 rgbSplit(vec2 coord){
  
  vec2 pixelSize = vec2(1.0) / uResolution;

  vec2 offset = pixelSize * 10.0;

  vec4 redTexture = texture2D(uTexture, coord - offset);
  vec4 greenTexture = texture2D(uTexture, coord);
  vec4 blueTexture = texture2D(uTexture, coord + offset);

  vec4 calcRGBSplit = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  float intensity = max(0.0, dot(vertNormal, vertLightDir));

  vec4 shadowColor;
  
  if(intensity > 0.95){
    shadowColor = vec4(1.0, 0.7804, 0.9255, 1.0) * calcRGBSplit;
  } else if(intensity > 0.5){
    shadowColor = vec4(0.9216, 0.4745, 0.7725, 1.0) * calcRGBSplit;
  }  else if(intensity > 0.25){
    shadowColor = vec4(1.0, 0.7804, 0.9255, 1.0) * calcRGBSplit;
  } else {
    shadowColor = vec4(0.9882, 0.8549, 0.9451, 1.0) * calcRGBSplit;
  }

  return shadowColor;
}

void main(){
  vec2 coord = vertTexCoord.xy;

  coord = wave_effect(coord);

  vec4 color = rgbSplit(coord);

  gl_FragColor = color;
}