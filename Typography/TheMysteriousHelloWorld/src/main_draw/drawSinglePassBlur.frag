precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform bool uFlag;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;

varying vec2 vTexCoord;

#define PI2 6.28318530718
#define PI 3.141592653589793

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

  vec4 redTexture1 = texture2D(uTexture1, coord - offset);
  vec4 greenTexture1 = texture2D(uTexture1, coord);
  vec4 blueTexture1 = texture2D(uTexture1, coord + offset);
  vec4 rgbTexture1 = vec4(redTexture1.r, greenTexture1.g, blueTexture1.b, 1.0);

  vec4 redTexture2 = texture2D(uTexture2, coord - offset);
  vec4 greenTexture2 = texture2D(uTexture2, coord);
  vec4 blueTexture2 = texture2D(uTexture2, coord + offset);
  vec4 rgbTexture2 = vec4(redTexture2.r, greenTexture2.g, blueTexture2.b, 1.0);

  vec4 redTexture3 = texture2D(uTexture3, coord - offset);
  vec4 greenTexture3 = texture2D(uTexture3, coord);
  vec4 blueTexture3 = texture2D(uTexture3, coord + offset);
  vec4 rgbTexture3 = vec4(redTexture3.r, greenTexture3.g, blueTexture3.b, 1.0);

  vec4 rgbTexture = rgbTexture1 * rgbTexture2 * rgbTexture3;

  return rgbTexture;
}

vec4 drawImage(vec2 coord){
  
  vec4 texture = rgbSplit(coord);

  return texture;
}

void main(){
  vec2 coord = vTexCoord;

  coord = wave_effect(coord);

  gl_FragColor = drawImage(coord);
}