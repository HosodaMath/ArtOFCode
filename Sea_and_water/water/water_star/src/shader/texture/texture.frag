precision highp float;
precision highp int;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

vec4 rgbTexture(vec2 coord){
  
  vec4 calcTexture = texture2D(uTexture, coord);

  return calcTexture;
}

void main(){
  vec2 coord = vTexCoord;

  vec4 color = rgbTexture(coord);

  gl_FragColor = color;
}