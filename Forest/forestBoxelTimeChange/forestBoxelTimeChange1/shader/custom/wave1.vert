uniform mat4 transform;
uniform mat4 texMatrix;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform float uTime;


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

vec3 createColor1(float time){
  vec3 calcColor = 0.5 + 0.5 * sin(time + PI / 3.0 * vec3(0.0, 2.0, 4.0));

  return calcColor;
}

vec3 createColor2(float time){
  float r = 0.2;
  float g = 0.5 + 0.5 * cos(time + PI / 3.0 * 2.0);
  float b = 0.5 + 0.5 * sin(time + PI / 3.0 * 4.0);
  vec3 calcColor = vec3(r, g, b);

  return calcColor;
}

vec3 createColor3(float time){
  vec3 calcColor1 = 0.5 + 0.5 * cos(time + PI / 3.0 * vec3(0.0, 2.0, 4.0));
  vec3 calcColor2 = 0.5 + 0.5 * sin(time + PI / 3.0 * vec3(0.0, 2.0, 4.0));
  vec3 calcColor3 = 0.5 + 0.5 * tan(time + PI / 3.0 * vec3(0.0, 2.0, 4.0));

  vec3 calcColor = calcColor1 * calcColor2 * calcColor3;

  return calcColor;
}

void main(){
  float len = length(position);
  float phase = fract(uTime - 0.01 * len);
  float wave = 0.5 - 0.5 * cos(2.0 * PI * exp(-4.0 * phase));
  
  float size = 4.0 * wave;
  vec3 shape = position.xyz - origin;
  vec3 pos = origin + size * shape;

  vec3 rgb = createColor3(3.0 - 3.0 * wave);
  float alpha = 1.0;
  vertColor = color;

  vertNormal = normalize(normalMatrix * normal);

  vertLightDir = -lightNormal;

  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);


  gl_Position = transform * vec4(pos, 1.0);

}