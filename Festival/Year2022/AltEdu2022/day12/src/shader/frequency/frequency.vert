attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;

varying vec3 vNormal;
varying vec2 vTexCoord;

void main(){
  vNormal = aNormal;
  vTexCoord = aTexCoord;

  vec4 positionVec4 = vec4(aPosition, 1.0);

  float frequency = 20.0;
  float amplitude = 0.1;

  float modeChange1 = cos(positionVec4.x * frequency + uFrameCount * 0.1);
  positionVec4.x += modeChange1 * aNormal.x * amplitude;

  float modeChange2 = sin(positionVec4.y * frequency + uFrameCount * 0.1);
  positionVec4.y += modeChange2 * aNormal.y * amplitude;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}