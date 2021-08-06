precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D uTexture;

// out
varying vec2 vTexCoord;

void main(){
  
  vec2 coord = vTexCoord;

  vec2 mirror = abs(coord * 2.0 - 1.0);
  vec4 calcTexture = texture2D(uTexture, mirror);

  gl_FragColor = calcTexture;
}
