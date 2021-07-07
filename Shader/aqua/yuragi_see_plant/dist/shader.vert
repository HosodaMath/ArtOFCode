/* 
  spehreの表面をゆらゆらと揺らすシェーダー
  法線テクスチャ
  頂点情報を通じて揺らす 
*/

// jsから情報を受け取る
// ジオメトリーの座標情報
attribute vec3 aPosition;

// ジオメトリーのテクスチャ座標情報
attribute vec2 aTexCoord;

// ジオメトリーの法線頂点
attribute vec3 aNormal;

// プロジェクション行列
uniform mat4 uProjectionMatrix;
// モデルビュー行列
uniform mat4 uModelViewMatrix;
// jsからフレームカウント情報を受け取る
uniform float uFrameCount;

// 頂点シェーダーからフラグメントシェーダーに情報を渡す。
// テクスチャ座標
varying vec2 vTexCoord;
// 法線の定義
varying vec3 vNormal;

void main() {
  // 4次元座標 
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // 頂点を揺らすための周波数
  float frequency = 20.0;
  //  頂点を揺らすための増幅数
  float amp = 0.1;

  // ユレユレ
  float distortion = cos(positionVec4.x * frequency + uFrameCount * 0.1);
  positionVec4.x += distortion * aNormal.x * amp;

  vNormal = aNormal;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

   vTexCoord = aTexCoord; 
}