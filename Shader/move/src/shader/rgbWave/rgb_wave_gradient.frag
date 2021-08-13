precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

// out
varying vec2 vTexCoord;
varying vec3 vNoise;

void main() {
  vec2 coord = vTexCoord;

  vec3 color = vNoise;
  
  // そのまま出力上記の vec3 color = vNoise;と同じ
  // color = vec3(vNoise.r, vNoise.g, vNoise.b);

  // 黄色にフィルターをかける
  // color = vec3(1.0, 1.0, vNoise.b);
  // 赤色にフィルターをかける
  // color = vec3(1.0, vNoise.g, vNoise.b);
  // 水色にフィルターをかける
  // color = vec3(vNoise.r, 1.0, 1.0);
  // 青色にフィルターをかける
  // color = vec3(vNoise.r, vNoise.g, 1.0);

  color = vec3(vNoise.r, vTexCoord.x , vTexCoord.y);

  gl_FragColor = vec4(color, 1.0);
}