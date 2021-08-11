precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D uTexture;
uniform float frequency;
uniform float amplitude;

// GLSL ES 3.0 -> out vTexCoord
varying vec2 vTexCoord;

void main(){
  vec2 uv = vTexCoord;

  // uv = 1.0 - uv;

  // コサインにゆらゆらと揺らす
  float cosineWave = cos(uv.x * frequency + time) * amplitude;
  vec2 distortCosineWave = vec2(cosineWave, 0.0);

  // サインにゆらゆらと揺らす
  float sineWave = sin(uv.y * frequency + time) * amplitude;
  vec2 distortSineWave = vec2(sineWave ,0.0);

  vec4 textureSin = texture2D(uTexture, uv + distortSineWave);

  gl_FragColor = textureSin;

}

