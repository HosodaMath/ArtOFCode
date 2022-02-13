attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform float uFrequencyData;
uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec3 vNoise;
varying vec2 vTexCoord;

void main(){
  vec4 positionVec4 = vec4(aPosition, 1.0);

  float frequency = 20.0;
  float amplitude = 0.1;
  float speed = 0.002;
  vec4 noise = texture2D(uTexture, fract(aTexCoord + uFrameCount * speed ));

  vNoise = noise.rgb;

  float modeChange1 = cos(positionVec4.x * frequency + uFrameCount * uFrequencyData);
  positionVec4.x += modeChange1 * aNormal.x * amplitude;

  float modeChange2 = sin(positionVec4.y * frequency + uFrameCount * uFrequencyData);
  positionVec4.y += modeChange2 * aNormal.y * amplitude;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vNormal = aNormal;

  vTexCoord = aTexCoord;
}