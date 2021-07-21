#define PI 3.14159265
attribute vec4 position;
attribute vec3 origin;
attribute vec3 normal;
attribute vec2 texCoord;


uniform mat4 modelViewMatrix;
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform mat4 texMatrix;
uniform vec3 lightNormal[8];
vec3 directionlLight[8];
uniform float uFrameCount;

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main(){
  float len = length(position);
  float phase = fract(uFrameCount - 0.01 * len);
  float wave = 0.5 - 0.5 * cos(2.0 * PI * exp(-4.0 * phase));

  float size = 4.0 * wave;
  vec3 shape = position.xyz - origin;
  vec3 p = origin + size * shape;

  gl_Position = transform * vec4(p, 1.0);

  vertNormal = normalize(normalMatrix * normal);

  directionlLight[0] = lightNormal[0];
  vertLightDir = -directionlLight[0];
  
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
}