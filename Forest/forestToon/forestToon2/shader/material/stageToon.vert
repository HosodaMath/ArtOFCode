uniform mat4 modelViewMatrix;
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform mat4 texMatrix;
uniform vec3 lightNormal[8];

vec3 directionlLight[8];

attribute vec4 vertex;
attribute vec3 normal;
attribute vec2 texCoord;

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main(){
  gl_Position = transform * vertex;

  vertNormal = normalize(normalMatrix * normal);

  directionlLight[0] = lightNormal[0];
  vertLightDir = -directionlLight[0];
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
}