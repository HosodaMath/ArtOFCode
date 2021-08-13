// in
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// out
varying vec2 vTexCoord;

void main(){
  vTexCoord = aTexCoord;

  vec4 positionVec4 = vec4(aPosition, 1.0);

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
