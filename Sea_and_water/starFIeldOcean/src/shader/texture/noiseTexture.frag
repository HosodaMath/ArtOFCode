precision highp float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;

vec4 createColor(vec2 coord){
  vec4 color = vec4(vNoise, 1.0);
  vec4 calcTexture = texture2D(uTexture, coord);

  vec4 calcColor = color * calcTexture;

  return calcColor;
}

void main() {
  vec2 coord = vTexCoord;
  
  vec4 color = createColor(coord);

  gl_FragColor = color;
}