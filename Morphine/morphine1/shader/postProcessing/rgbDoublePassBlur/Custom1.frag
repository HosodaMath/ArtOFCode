precision highp float;
precision highp int;

// template uniform
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform vec2 uTexelSize;
uniform vec2 uDirection;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

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

vec4 createColor(vec2 coord){
  vec4 calcColor1 = vec4(gaussianBlur(uTexture1, coord, uTexelSize * uDirection),1.0);
  vec4 calcColor2 = vec4(gaussianBlur(uTexture2, coord, uTexelSize * uDirection),1.0);
  vec4 calcColor = calcColor1 * calcColor2;

  return calcColor;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = createColor(locationCoord);

  gl_FragColor = color;
}