uniform mat4 transform;
uniform mat4 texMatrix;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;


attribute vec4 position;
attribute vec4 color;
attribute vec3 normal;
attribute vec3 origin;
attribute vec2 texCoord;

varying vec4 vertColor;
varying vec4 vertTexCoord;
varying vec3 vertNormal;
varying vec3 vertLightDir;
#define PI 3.14159265

void main(){
  gl_Position = transform * position;

  // vertNormal = normal;
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
}