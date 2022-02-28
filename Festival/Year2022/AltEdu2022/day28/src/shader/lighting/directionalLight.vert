#version 300 es
precision highp float;
precision highp int;
in vec4 aColor;
in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;
uniform mat4 uModelViewProjectionMatrix;
out vec4 vColor;
out vec3 vNormal;
out vec2 vTexCoord;
void main(void) {

  // 色情報（事前に定義済み）
  vColor = aColor;

  vNormal = aNormal;

  // テクスチャ座標（事前に定義済み）
  vTexCoord = aTexCoord;
  
  gl_Position = uModelViewProjectionMatrix * vec4(aPosition, 1.0);
}