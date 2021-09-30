precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uMouseX;
uniform float uTime;
uniform sampler2D uTexture;
uniform sampler2D uBackground;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbDisplacementMap(vec2 coord){
  
  vec4 calcTexture1 = texture2D(uTexture, coord);

  float avg = dot(calcTexture1.rgb, vec3(0.33333));

  avg = avg * 2.0 - 1.0;

  float disp = avg * uMouseX;

  vec4 calcTexture = texture2D(uBackground, coord + disp);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbDisplacementMap(locationCoord);

  gl_FragColor = color;
}
