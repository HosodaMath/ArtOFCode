precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  float frequency = clamp(cos(uTime) * 5.0, 1.0, 10.0);

  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2) * frequency;
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2) * frequency;
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2) * frequency;
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2) * frequency;
  
  return coord;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 uv = vec2(coord.x, coord.y);
  // uv = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  
  uv = wave_effect(uv);
  vec4 color = texture2D(uTexture, uv);

  gl_FragColor = color;
}
