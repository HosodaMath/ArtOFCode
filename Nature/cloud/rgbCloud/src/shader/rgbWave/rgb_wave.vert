// GLSL ES 3.0 -> in aPosition
// GLSL ES 3.0 -> in aTexCoord
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
// uniform sampler2D uTexture;

// GLSL ES 3.0 -> out vTexCoord
varying vec2 vTexCoord;

// GLSL ES 3.0 -> out color
// varying vec4 vColor;

void main(){
  vTexCoord = aTexCoord;

  // GLSL ES 3.0 texture2D -> texture() 
  // vec4 redTexture = texture2D(uTexture, vTexCoord);
  // vec4 greenTexture = texture2D(uTexture, vTexCoord);
  // vec4 blueTexture = texture2D(uTexture, vTexCoord);

  // vec4 color = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  // vColor = color;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  // positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
