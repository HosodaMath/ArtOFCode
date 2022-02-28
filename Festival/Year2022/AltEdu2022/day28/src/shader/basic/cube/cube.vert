#version 300 es
precision highp float;
precision highp int;
in vec4 aColor;
in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;
uniform mat4 modelViewProjectionMatrix;
out vec4 vColor;
out vec3 vNormal;
out vec2 vTexCoord;

void main(void){

  vNormal = aNormal;

  vColor = aColor;

  // vTexCoord = ((aPosition + 1.0) * 0.5).xy;
  vTexCoord = aTexCoord;

  gl_Position = modelViewProjectionMatrix * vec4(aPosition, 1.0);
}