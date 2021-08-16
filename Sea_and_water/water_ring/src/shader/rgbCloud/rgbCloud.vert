// in
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform sampler2D uTexture;

// out
varying vec2 vTexCoord;
varying vec3 vNoise;

void main(){
  vTexCoord = aTexCoord;

  float speed = 0.001;
  vec2 stripe = vec2(0.5, vTexCoord.y);
  
  vec4 textureCalc = texture2D(uTexture, fract(aTexCoord * stripe + uFrameCount * speed));
  vNoise = textureCalc.rgb;

  vec4 positionVec4 = vec4(aPosition, 1.0);

  float amp = 1.0;
  positionVec4.xyz += (textureCalc.rgb - 0.5) * aNormal * amp;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
