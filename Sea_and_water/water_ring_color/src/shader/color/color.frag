precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uFrameCount;

varying vec2 vTexCoord;

void main(){
  vec2 coord = vTexCoord;
  coord = (1.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  gl_FragColor = vec4(1.0, coord.x, coord.y, 1.0);
}