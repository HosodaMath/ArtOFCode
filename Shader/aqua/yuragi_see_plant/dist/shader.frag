precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

varying vec2 vTexCoord;
varying vec3 vNormal;

vec3 create(vec2 coord){
  // vec3 color = vNormal * 0.5 + 0.5;
  
  float r = vNormal.x * 0.5 + 0.5;
  float g = 1.0;
  float b = vNormal.y * 0.5 + 0.5;
  vec3 color = vec3(r, g, b);

  return color;
}

void main() {
  vec2 coord = vTexCoord;

  vec3 color = create(coord);

  gl_FragColor = vec4(color, 1.0);
}