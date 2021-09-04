precision highp float;
precision highp int;

// Base Uniform
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

// App Uniform
uniform vec2 uTexelSize;
uniform vec2 uDirection;

varying vec2 vTexCoord;

vec3 gaussianBlur(sampler2D uTexture, vec2 coord, vec2 stepSize){
  vec3 color = vec3(0.0);
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

  float gOffsets[stepCount];
  gOffsets[0] = 0.66293;
	gOffsets[1] = 2.47904;
	gOffsets[2] = 4.46232;
	gOffsets[3] = 6.44568;
  gOffsets[4] = 8.42917;
  gOffsets[5] = 10.41281;
  gOffsets[6] = 12.39664;
	gOffsets[7] = 14.38070;
	gOffsets[8] = 16.36501;
  
  for(int i = 0; i < stepCount; i++){
    vec2 textureCoordOffset = gOffsets[i] * stepSize;

    vec3 calcColor = texture2D(uTexture, coord + textureCoordOffset).rgb + texture2D(uTexture, coord - textureCoordOffset).rgb;

    calcColor *= gWeights[i];

    color += calcColor;
  }

  return color;
}

void main(){
  vec2 coord = vTexCoord;

  vec3 color = gaussianBlur(uTexture, coord, uTexelSize * uDirection);

  gl_FragColor = vec4(color, 1.0);
}