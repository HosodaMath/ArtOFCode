#version 300 es
precision highp float;
precision highp int;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMartix;
uniform vec3 uLightDirection;
uniform vec3 uLightDiffuse;
uniform vec3 uMaterialDiffuse;

// in vec4 aColor;
in vec3 aPosition;
in vec3 aNormal;
// in vec2 aCoord;

out vec4 vColor;
void main(void){
  // 法線ベクトル
  vec3 normalVec = normalize(vec3(uNormalMartix * vec4(aNormal, 1.0)));

  // ライトベクトル
  vec3 lightVec = normalize(uLightDirection);

  // ライトベクトルは逆ベクトルにする
  float lambert = dot(normalVec, -lightVec);

  // ランバート反射を色として出力
  vec3 lambertReflectionColor = uLightDiffuse * lambert * uMaterialDiffuse;

  // フラグメントシェーダーにデータ送信
  vColor = vec4(lambertReflectionColor, 1.0);

  // modelViewProjectionMatrixの作成 
  gl_Position = uModelViewMatrix * uProjectionMatrix * vec4(aPosition, 1.0);
}