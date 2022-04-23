precision highp float;
precision highp int;

attribute vec4 color;
attribute vec4 vertex;
attribute vec3 normal;
attribute vec2 texCoord;

uniform mat4 modelview;
uniform mat4 transform;
uniform mat4 texMatrix;
uniform mat3 normalMatrix;

varying vec4 vTexCoord;
varying vec3 vNormal;

void main(){

  vTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

  vNormal = normal;

  gl_Position = transform * vertex;  
}
