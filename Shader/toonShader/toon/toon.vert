uniform mat4 modelViewMatrix;
uniform mat4 transform;
uniform mat3 normalMatrix;

uniform vec3 lightNormal[8];

attribute vec4 vertex;
attribute vec3 normal;

varying vec3 vertNormal;
varying vec3 vertLightDir;

void main(){
  gl_Position = transform * vertex;

  vertNormal = normalize(normalMatrix * normal);

  vertLightDir = -lightNormal[0];
}