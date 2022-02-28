#version 300 es
precision highp float;
precision highp int;

in vec4 aColor;
in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;
out vec4 vColor;
out vec3 vNormal;
out vec2 vTexCoord;
uniform mat4 modelViewProjectionMatrix;
void main(void){

  vColor = aColor;

  vNormal = aNormal;

  vTexCoord = aTexCoord;

  gl_Position = vec4(aPosition, 1.0) * modelViewProjectionMatrix;
}