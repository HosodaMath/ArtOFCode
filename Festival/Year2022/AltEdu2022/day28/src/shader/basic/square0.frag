#version 300 es
precision highp float;
precision highp int;

in vec4 vColor;

out vec4 fragColor;

void main(void){

  fragColor = vColor;
}