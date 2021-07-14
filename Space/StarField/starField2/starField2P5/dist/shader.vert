// jsから情報を受け取る
attribute vec3 aPosition;
attribute vec2 aTexCoord;
// 頂点シェーダーからフラグメントシェーダーに情報を渡す。
varying vec2 vTexCoord;
void main() {
  
  vTexCoord = aTexCoord;
  
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}