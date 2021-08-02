precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D uTexture;

// GLSL ES 3.0 -> out vec2 vTexCoord;
varying vec2 vTexCoord;

// GLSL ES 3.0 -> out color
// varying vec4 vColor;

void main(){
  vec2 uv = vTexCoord;

  vec2 pixelSize = vec2(1.0) / resolution;
  vec2 offset = pixelSize * abs(cos(time) * 10.0);

  // GLSL ES 3.0 texture2D -> texture() 
  vec4 redTexture = texture2D(uTexture, uv - offset);
  vec4 greenTexture = texture2D(uTexture, uv);
  vec4 blueTexture = texture2D(uTexture, uv + offset);

  vec4 color = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  // GLSL ES 3.0 gl_FragColor -> out
  gl_FragColor = color;
}