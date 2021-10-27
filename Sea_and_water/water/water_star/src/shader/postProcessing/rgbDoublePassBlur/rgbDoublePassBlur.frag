precision highp float;
precision highp int;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform vec2 uTexelSize;
uniform vec2 uDirection;
uniform sampler2D uTexture;
varying vec2 vTexCoord;

vec3 gaussianBlur(sampler2D texture, vec2 textureCoord, vec2 stepSize){
  vec3 color = vec3(0.0, 0.0, 0.0);

  const int stepCount = 9;

  float gWeights[stepCount];
  gWeights[0] = 0.10855;
  gWeights[1] = 0.13135;
  gWeights[2] = 0.10406;
  gWeights[3] = 0.07216;
  gWeights[4] = 0.04380;
  gWeights[5] = 0.02328;
  gWeights[6] = 0.01083;
  gWeights[7] = 0.00441;
  gWeights[8] = 0.00157;

  float gOffset[stepCount];
  gOffset[0] = 0.66293;
  gOffset[1] = 2.47904;
  gOffset[2] = 4.46232;
  gOffset[3] = 6.44568;
  gOffset[4] = 8.42917;
  gOffset[5] = 10.41281;
  gOffset[6] = 12.39664;
  gOffset[7] = 14.38070;
  gOffset[8] = 16.36501;

  for(int i = 0; i < stepCount; i++){
    vec2 textureCoordOffset = gOffset[i] * stepSize;
    vec3 calcColor = texture2D(texture, textureCoord + textureCoordOffset).xyz + texture2D(texture, textureCoord - textureCoordOffset).xyz;

    calcColor *= gWeights[i];

    color += calcColor;
  }

  return color;
}
void main(){
  vec2 coord = vTexCoord;

  vec4 color = vec4(
    gaussianBlur(uTexture, coord, uTexelSize * uDirection),
    1.0);

  gl_FragColor = color;
}