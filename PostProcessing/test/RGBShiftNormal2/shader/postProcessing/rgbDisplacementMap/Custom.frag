precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uBackground;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbDisplacementMap(vec2 coord){
  
  vec4 calcTexture1 = texture2D(uTexture1, coord);
  vec4 calcTexture2 = texture2D(uTexture2, coord);

  vec4 preCalcTexture = calcTexture1 * calcTexture2;

  float avg = dot(preCalcTexture.rgb, vec3(0.33333));

  avg = avg * 2.0 - 1.0;

  float dispX = avg * uMouse.x;
  float dispY = avg * uMouse.y;

  vec2 calcDisp = vec2(coord.x + dispX, coord.y + dispY);
  vec4 calcTexture = texture2D(uBackground, calcDisp);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbDisplacementMap(locationCoord);

  gl_FragColor = color;
}
