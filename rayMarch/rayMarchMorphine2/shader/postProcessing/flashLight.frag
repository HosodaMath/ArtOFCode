precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uTexture;
varying vec4 vertTexCoord;
varying vec4 vertColor;
varying vec3 vertNormal;
const float PI = 3.14159265359;
const float PI2 = 6.28318530718;


float sphere(vec2 position, vec2 size){
  vec2 positionCalc = position - size;
  positionCalc.x *= uResolution.x / uResolution.y;
  float dist = length(positionCalc * 2.0);

  return dist;
}

void main(void){
  vec2 coord = vertTexCoord.xy;
  vec4 texture = texture2D(uTexture, coord);
  vec2 position = vec2(uMouse.x, 1.0 - uMouse.y);
  vec2 size = gl_FragCoord.xy / uResolution.xy;
  float circleDist = sphere(position, size);
  vec4 destColor = texture * vec4(vec3(1.5 - circleDist), 1.0);

  gl_FragColor = destColor;
}