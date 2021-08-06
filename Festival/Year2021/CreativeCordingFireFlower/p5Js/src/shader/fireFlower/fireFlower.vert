attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform sampler2D uTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;

void main(){
  float tile = 0.1;
  float speed = 0.00002;
  vec4 noise = texture2D(uTexture, fract(aTexCoord * tile + uFrameCount * speed));

  vNoise = noise.rgb;

  vec4 positionVec4 = vec4(aPosition, 1.0);

  float amp = 0.01;

  positionVec4.xyz += (noise.rgb - 0.5) * aNormal * amp;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vTexCoord = aTexCoord;
}