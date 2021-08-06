precision highp float;

uniform vec3 uColor;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

varying vec2 vTexCoord;
// varying vec3 vNoise;

void main() {
  vec3 color = vec3(uColor.r, uColor.g, uColor.b);

  gl_FragColor = vec4(color, 1.0);
}