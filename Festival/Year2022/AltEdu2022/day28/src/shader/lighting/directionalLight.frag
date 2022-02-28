#version 300 es
precision highp float;
precision highp int;
in vec4 vColor;
in vec3 vNormal;
in vec2 vTexCoord;
// 逆行列を追加 
// ライトベクトルは逆ライトベクトルなので逆行列が必要になる
uniform mat4 uInvertMatrix;
// 環境光源の色
uniform vec4 uAmbinetMaterial;
// ライトベクトル（光源の方向）
uniform vec3 uLightDirection;
out vec4 fragColor;
void main(void){
  
  vec2 coord = vTexCoord;

  // 逆ライトベクトル
  vec3 invertLight = normalize(uInvertMatrix * vec4(uLightDirection, 0.0)).xyz;
  
  // 光の拡散値  法線ベクトルと逆ライトベクトルを内積を用いて求める
  float lightDiffuse = clamp(dot(vNormal, invertLight), 0.1, 1.0);

  vec4 color = vColor * vec4(vec3(lightDiffuse), 1.0) + uAmbinetMaterial;
  
  fragColor = color;

}