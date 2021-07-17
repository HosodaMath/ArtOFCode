// モデルビュー行列
uniform mat4 modelViewMatrix;

// 変換行列
uniform mat4 transform;

// 法線ベクトルの座標変換行列
uniform mat3 normalMatrix;

// テクスチャ行列
uniform mat4 texMatrix;

// 法線ライトベクトル
uniform vec3 lightNormal[8];

// 法線ライトベクトル -> 平行光源ベクトル
vec3 directionlLight[8];

// 頂点ベクトル
attribute vec4 vertex;

// 法線ベクトル
attribute vec3 normal;

// テクスチャ座標
attribute vec2 texCoord;

// 座標変換後の法線ベクトル
varying vec3 vertNormal;

// 座標変換後の平行光源
varying vec3 vertLightDir;

// 座標変換後のテクスチャ座標
varying vec4 vertTexCoord;

void main(){
  gl_Position = transform * vertex;

  vertNormal = normalize(normalMatrix * normal);

  directionlLight[0] = lightNormal[0];
  vertLightDir = -directionlLight[0];
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
}