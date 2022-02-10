precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vTexCoord;
const float PI = 3.14159265359;
const float PI2 = 6.28318530718;

void main(){
  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  vec4 color1 = vec4(1.0 , 1.0, 1.0, 1.0);
  vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);  

  vec4 resultColor = vec4(coord.x, coord.y, 1.0, 1.0);

  gl_FragColor = resultColor;
}