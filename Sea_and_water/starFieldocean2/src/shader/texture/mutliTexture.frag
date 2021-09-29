precision highp float;
precision highp int;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec2 vTexCoord;

vec4 rgbTexture(vec2 coord){
  
  vec4 calcTexture1 = texture2D(uTexture1, coord);
  vec4 calcTexture2 = texture2D(uTexture2, coord);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}

void main(){
  vec2 coord = vTexCoord;

  vec4 color = rgbTexture(coord);

  gl_FragColor = color;
}