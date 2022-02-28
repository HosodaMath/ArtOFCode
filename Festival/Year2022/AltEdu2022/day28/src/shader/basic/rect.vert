#version 300 es
precision highp float;
precision highp int;

in vec4 aColor;
in vec3 aPosition;
out vec4 vColor;
uniform mat4 modelViewProjectionMatrix;
void main(void){

  vColor = aColor;

  gl_Position = vec4(aPosition, 1.0) * modelViewProjectionMatrix;
}