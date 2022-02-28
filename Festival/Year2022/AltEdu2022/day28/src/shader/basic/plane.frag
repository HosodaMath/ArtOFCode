#version 300 es
precision highp float;
precision highp int;

in vec4 vColor;
in vec2 vTexCoord;
out vec4 fragColor;

void main(void){

  vec4 addColor = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0);
  vec4 color = vColor * addColor;

  fragColor = color;
}