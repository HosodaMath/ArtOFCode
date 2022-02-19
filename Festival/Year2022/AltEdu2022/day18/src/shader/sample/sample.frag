#version 300 es

precision highp float;

out vec4 o_color;

uniform vec3 u_color;

void main(void) {
  o_color = vec4(u_color, 1.0);
}